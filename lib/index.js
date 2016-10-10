'use strict'

const { EventEmitter } = require('events')
const Promise = require('bluebird')
const path = require('path')
const R = require('ramda')
const fs = require('fs')

const constants = require('./constants')
const CacheWorker = require('./cache')
const {
  RequestWorker,
  BadRequestError,
  UnauthorizedError
} = require('./worker')

const getStringMaker = R.compose(R.join('&'), R.map(p => {
  if (R.type(p[1]) === 'Array') {
    p[1] = R.join(',', p[1])
  }
  return R.join('=', p)
}), R.toPairs)

/**
 * A library for accessing the Riot API from Node
 *
 * @param {Object|String} options - Either your riot api key or an object
 *                                with options for Ashe
 * @param {string} options.apiKey - Riot API Key
 * @param {Object} options.cache - An object with cachable functions or
 *                               a Redis cache of some sorts
 * @param {Object[]} [options.rateLimits] - Rules for limits set on the
 *                                           requests made to riot
 */
class Ashe extends EventEmitter {
  constructor (options) {
    super()

    if (R.type(options) === 'String') {
      let o = {
        apiKey: options,
        cache: null,
        rateLimits: [
          { interval: 10, limit: 10 },
          { interval: 600, limit: 500 }
        ],
        globalRateLimits: [
          { interval: 60, limit: 250 }
        ]
      }
      options = o
    }

    if (options.apiKey === null) {
      throw new Error('\'apiKey\' is a required argument')
    }

    this._key = options.apiKey

    this._stats = {
      hits: 0,
      misses: 0,
      errors: 0,
      cacheErrors: 0,
      workerErrors: 0
    }

    this.workers = R.compose(R.fromPairs, R.map(region => {
      let w = new RequestWorker({
        region,
        rateLimits: options.rateLimits
      })
      w.on('error', err => {
        this._onError(err)
        this.emit('workerError', {
          error: err,
          region: region
        })
      })
      return [region, w]
    }), R.keys)(constants.regions)

    let worker = new RequestWorker({
      region: 'global',
      rateLimits: options.globalRateLimits
    })

    worker.on('error', (err, reg) => {
      this._onError(err)
      this.emit('workerError', {
        error: err,
        region: reg
      })
    })

    this.workers['global'] = worker

    let cache = new CacheWorker(options.cache)
    cache.on('error', err => {
      this._onError(err)
      this.emit('cacheError', {error: err})
    })

    this._cache = cache
  }

  destroy () {
    let workersP = R.map(worker => worker.destroy(), R.values(this.workers))
    return Promise.all(workersP)
    .then(() => this._cache.destroy())
    .then(() => {
      this.emit('destroyed')
      this.remoteAllListeners()
      return true
    })
  }

  getClientStats () {
    let workers = R.map(worker => worker.getStats(), this.workers)
    return {
      stats: this._stats,
      workers
    }
  }

  _onError (err) {
    this._stats.errors++
    this.emit('error', {error: err})
  }

  _makeRequest (params) {
    let region = params.region
    let queryParams = params.queryParams || {}

    let url = `${params.url}?${getStringMaker(queryParams)}`
    let worker = this.workers[(params.runGlobal ? 'global' : region)]

    return worker.makeRequest(`${url}&api_key=${this._key}`)
    .then(JSON.parse)
    .catch(BadRequestError, UnauthorizedError, err => {
      if (err instanceof BadRequestError) {
        this._stats.workerErrors++
      }

      this._onError(err)

      return null
    })
  }

  _makeCachedRequest (params) {
    let region = params.region

    let cacheParams = params.cache
    let cacheKey = `ashe:${region}:${params.rest.fullName}:${cacheParams.key}`
    return this._cache.get(cacheKey)
    .then(cacheRes => {
      if (cacheRes === null) {
        return this._makeRequest(params)
        .then(reqRes => {
          if (reqRes !== null || (reqRes === null && cacheParams.saveIfNull === true)) {
            return this._cache.set(cacheKey, reqRes, cacheParams.ttl || 120)
            .return(reqRes)
          }
          return reqRes
        })
      } else {
        return cacheRes
      }
    })
  }

  _makeMultiRequest (params) {
    let data = params.data
    let suffix = params.suffix || ''
    let cacheParams = params.cache
    let results = {}
    let keys = {}

    return Promise.all(R.map(datum => {
      let cacheKey = `ashe:${params.region}:${params.rest.fullName}:${cacheParams.keyFn(datum)}`
      return this._cache.get(cacheKey)
      .then(res => ({id: datum, key: cacheKey, value: res}))
    }, data))
    .each(res => {
      results[res.id] = res.value
      keys[res.id] = res.key
    })
    .filter(R.where({value: R.equals(null)}))
    .then(R.splitEvery(params.maxObjs))
    .then(R.map(group => {
      let url = `${params.url}/${R.join(',', R.pluck('id', group))}${suffix}`
      return this._makeRequest({
        rest: params.rest,
        caller: params.caller,
        region: params.region,
        runGlobal: params.runGlobal,
        url
      })
      .then(R.toPairs)
      .map((item) => {
        let id = item[0]
        results[id] = item[1]
        this._cache.set(keys[id], item[1], cacheParams.ttl)
        return item
      }, {concurrency: Infinity})
    }))
    .all()
    .return(results)
  }

  _genURL (region, rest) {
    return `https://${region}.api.pvp.net/api/lol/${region}/v${rest.version}/${rest.name}`
  }
}

let modules = fs.readdirSync(path.join(__dirname, 'api'))
R.forEach(module => {
  let moduleFile = module
  let moduleName = path.basename(moduleFile, path.extname(moduleFile))
  let api = require(`./api/${moduleName}`)
  for (let [fnName, func] of R.toPairs(api.methods)) {
    Object.defineProperty(Ashe.prototype, fnName, {
      value: func
    })
    // Ashe.prototype[fnName] = func
  }
}, modules)

/**
 * Ashe constants
 * @see Riot API Constants: {@link https://developer.riotgames.com/docs/game-constants}
 * @type {Object}
 * @memberof Ashe
 */
Ashe.CONSTANTS = constants

/**
 * Contains the maps constants data
 * @see Riot API Constants: {@link https://developer.riotgames.com/docs/game-constants}
 * @type {Object}
 * @memberof Ashe
 */
Ashe.MAPS = Ashe.CONSTANTS.maps

/**
 * [GAMEMODES description]
 * @see Riot API Constants: {@link https://developer.riotgames.com/docs/game-constants}
 * @type {Object}
 * @memberof Ashe
 */
Ashe.GAMEMODES = Ashe.CONSTANTS.gameModes

/**
 * [GAMETYPES description]
 * @see Riot API Constants: {@link https://developer.riotgames.com/docs/game-constants}
 * @type {Object}
 * @memberof Ashe
 */
Ashe.GAMETYPES = Ashe.CONSTANTS.gameTypes

/**
 * [SUBTYPES description]
 * @see Riot API Constants: {@link https://developer.riotgames.com/docs/game-constants}
 * @type {Object}
 * @memberof Ashe
 */
Ashe.GAMETYPES = Ashe.CONSTANTS.subTypes

/**
 * [REGIONS description]
 * @see Riot API Constants: {@link https://developer.riotgames.com/docs/game-constants}
 * @type {Object}
 * @memberof Ashe
 */
Ashe.REGIONS = Ashe.CONSTANTS.regions

/**
 * [QUEUETYPES description]
 * @see Riot API Constants: {@link https://developer.riotgames.com/docs/game-constants}
 * @type {Object}
 * @memberof Ashe
 */
Ashe.QUEUETYPES = Ashe.CONSTANTS.queueTypes

module.exports = Ashe

/**
 * Destroyed event
 *
 * @event destroyed
 * @memberof Ashe
 * @instance
 */

/**
 * Error event
 *
 * @event error
 * @memberof Ashe
 * @instance
 * @property {Error} err Error emitted when an error occurs
 */

/**
 * Worker error event
 *
 * @event workerError
 * @memberof Ashe
 * @instance
 * @property {Error} error The error that occurred
 * @property {string} region The region that had the error
 */

/**
 * Cache error event
 *
 * @event cacheError
 * @memberof Ashe
 * @instance
 * @property {Error} err Error emitted when a cacheError occurs
 */

/**
  * @external Promise
  * @see https://github.com/petkaantonov/bluebird
 */
