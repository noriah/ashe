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

class Ashe extends EventEmitter {
  constructor (opts = {
    apiKey: null,
    cache: null,
    rateLimits: [
      { interval: 10, limit: 10 },
      { interval: 600, limit: 500 }]
  }) {
    super()

    if (R.type(opts) === 'String') {
      var o = {
        apiKey: opts,
        cache: null,
        rateLimits: [
        { interval: 10, limit: 10 },
        { interval: 600, limit: 500 }]
      }
      opts = o
    }

    if (opts.apiKey === null) {
      throw new Error('\'apiKey\' is a required argument')
    }

    this._key = opts.apiKey

    this._stats = {
      hits: 0,
      misses: 0,
      errors: 0,
      cacheErrors: 0,
      workerErrors: 0
    }

    this.workers = R.compose(R.fromPairs, R.map(region => {
      var w = new RequestWorker({
        region,
        rateLimits: opts.rateLimits
      })
      w.on('error', err => {
        this._onError(err)
        this.emit('workerError', err, region)
      })
      return [region, w]
    }), R.keys)(constants.regions)

    var worker = new RequestWorker({
      region: 'global',
      rateLimits: [{ interval: 60, limit: 250 }]
    })

    worker.on('error', (err, reg) => {
      this._onError(err)
      this.emit('workerError', err, reg)
    })

    this.workers['global'] = worker

    this._cache = new CacheWorker(opts.cache)
  }

  destroy () {
    var workersP = R.map(worker => worker.destroy(), R.values(this.workers))
    return Promise.all(workersP)
    .then(() => this._cache.destroy())
    .then(() => {
      this.emit('destroyed')
      this.remoteAllListeners()
      return true
    })
  }

  getClientStats () {
    var workers = R.map(worker => worker.getStats(), this.workers)
    return {
      stats: this._stats,
      workers
    }
  }

  _onError (err) {
    this._stats.errors++
    this.emit('error', err)
  }

  _makeRequest (params) {
    var region = params.region
    var queryParams = params.queryParams || {}

    var url = `${params.url}?${getStringMaker(queryParams)}`
    var worker = this.workers[region]

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
    var region = params.region

    var cacheParams = params.cache
    var cacheKey = `ashe-${region}-${params.rest.fullName}-${cacheParams.key}`
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
    var data = params.data
    var suffix = params.suffix || ''
    var cacheParams = params.cache
    var results = {}
    var keys = {}

    return Promise.all(R.map(datum => {
      var cacheKey = cacheParams.keyFn(datum)
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
      var url = `${params.url}/${R.join(',', R.pluck('id', group))}${suffix}`
      return this._makeRequest({
        rest: params.rest,
        caller: params.caller,
        region: params.region,
        url
      })
      .then(R.toPairs)
      .map((item) => {
        var id = item[0]
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

var modules = fs.readdirSync(path.join(__dirname, 'api'))
R.forEach(module => {
  var moduleFile = module
  var moduleName = path.basename(moduleFile, path.extname(moduleFile))
  var api = require(`./api/${moduleName}`)
  for (let [fnName, func] of R.toPairs(api.methods)) {
    Object.defineProperty(Ashe.prototype, fnName, {
      value: func
    })
    // Ashe.prototype[fnName] = func
  }
}, modules)

Ashe.Maps = constants.maps
Ashe.GameModes = constants.gameModes
Ashe.GameTypes = constants.gameTypes
Ashe.Regions = constants.regions
Ashe.QueueTypes = constants.queueTypes

module.exports = Ashe
