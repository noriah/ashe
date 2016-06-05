'use strict'

const { EventEmitter } = require('events')
const Promise = require('bluebird')
const R = require('ramda')

const constants = require('./constants')
const {
  RequestWorker,
  BadRequestError,
  UnauthorizedError
} = require('./worker')

const getStringMaker = R.compose(R.join('&'), R.map(R.join('=')), R.toPairs)

const LOL_REGIONS = R.append('global', R.keys(constants.regions))

const validateRegion = region => R.contains(region, LOL_REGIONS)

class Ashe extends EventEmitter {
  constructor ({
    apiKey: optsApiKey = null,
    cache: optsCache = null,
    rateLimits: optsRateLimits = [
      { interval: 10, limit: 10 },
      { interval: 600, limit: 500 }]
  }) {
    super()

    if (optsApiKey === null) {
      throw new Error('\'apiKey\' is a required argument')
    }

    this._key = optsApiKey

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
        rateLimits: optsRateLimits
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

    // TODO: local cache time implementation
    if (optsCache !== null) {
      this._cache = {
        get: key => new Promise((resolve, reject) => {
          optsCache.get(key, (err, res) => {
            if (err) {
              this._stats.cacheErrors++
              this._onError(err)
              this.emit('cacheError', err)
              return reject(err)
            }
            return resolve(res)
          })
        }),

        set: (key, value, ttl = 120) => new Promise((resolve, reject) => {
          var cacheValue = JSON.stringify(value)
          optsCache.set(key, cacheValue, (err, res) => {
            if (err) {
              this._stats.cacheErrors++
              this._onError(err)
              this.emit('cacheError', err)
              return reject(err)
            }
            optsCache.expire(key, ttl)
            return resolve(res)
          })
        }),

        destroy: () => new Promise((resolve, reject) => {
          var res = 0
          try {
            if (typeof optsCache.destory === 'function') {
              res = optsCache.quit()
            }
          } catch (err) {
            this._onError(err)
            return reject(err)
          }
          return resolve(res)
        })
      }
    } else {
      this._cache = {
        get: params => Promise.resolve(null),
        set: (params, value) => Promise.resolve(null),
        destroy: () => Promise.resolve(null)
      }
      console.log('[Ashe] No caching.... You do live dangerously')
    }
  }

  // TODO: remove events
  destroy () { return this._cache.destroy() }

  getStats () {
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

  _internalRequest (params) {
    var region = params.region
    var queryParams = params.queryParams || {}
    // var pars = R.clone(params.queryParams) || {}
    // pars['api_key'] = this._key

    var url = `${params.url}?${getStringMaker(queryParams)}`
    var worker = this.workers[region]

    return worker.makeRequest(`${url}&api_key=${this._key}`)
    .then(JSON.parse)
    .catch(BadRequestError, UnauthorizedError, err => {
      if (err instanceof BadRequestError) {
        this._stats.workerErrors++
      }

      this._onError(err)

      // sentry.captureException(err, {
      //   extra: {
      //     region, url, queryParams,
      //     clientStats: this._stats,
      //     apiMethod: params.caller,
      //     restEndpoint: params.rest,
      //     hasApiKey: this._key !== null
      //   },
      //   tags: { lib: 'Ashe' },
      //   level: 'warning'
      // })

      return null
    })
  }

  _makeRequest (params) {
    params.region = params.region.toLowerCase()

    if (!validateRegion(params.region)) {
      return Promise.reject(new Error(`'${params.region}' is not a valid region`))
    }

    return this._internalRequest(params)
  }

  _makeCachedRequest (params) {
    params.region = params.region.toLowerCase()

    if (!validateRegion(params.region)) {
      return Promise.reject(new Error(`'${params.region}' is not a valid region`))
    }
    var cacheParams = params.cache
    var cacheKey = `ashe-${params.region}-${params.rest.fullName}-${cacheParams.key}`
    this._cache.get(cacheKey)
    .then(cacheRes => {
      if (cacheRes === null) {
        return this._internalRequest(params)
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

  }
}

module.exports = Ashe
