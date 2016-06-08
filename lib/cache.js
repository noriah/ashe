'use strict'

const { EventEmitter } = require('events')
const Promise = require('bluebird')

class FakeCache {
  get (key, cb) { return cb(null, null) }
  set (key, data, cb) { return cb(null, null) }
  expire (key, ttl) { return null }
  quit () { return 0 }
}

class CacheWorker extends EventEmitter {
  constructor (cache) {
    super()

    if (cache === null) {
      this.cache = new FakeCache()
      console.log('[Ashe] No caching?.... You do live dangerously')
    } else {
      this.cache = cache
    }
  }

  get (key) {
    return new Promise((resolve, reject) => {
      this.cache.get(key, (err, res) => {
        if (err) {
          this.emit('error', err)
          return reject(err)
        }

        if (res !== null) {
          var data = JSON.parse(res)
          if (data.expires <= Date.now()) {
            return resolve(null)
          }
          return resolve(data.value)
        }

        return resolve(null)
      })
    })
  }

  set (key, value, ttl = 120) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({
        value,
        expires: Date.now() + ttl * 1000
      })

      this.cache.set(key, data, (err, res) => {
        if (err) {
          this.emit('error', err)
          return reject(err)
        }

        if (this.cache.expire) {
          this.cache.expire(key, ttl)
        }

        return resolve(res)
      })
    })
  }

  destroy () {
    return new Promise((resolve, reject) => {
      var res = 0
      try {
        if (typeof this.cache.destory === 'function') {
          res = this.cache.quit()
        }
      } catch (err) {
        this.emit('error', err)
        return reject(err)
      }
      return resolve(res)
    })
  }
}

module.exports = CacheWorker
