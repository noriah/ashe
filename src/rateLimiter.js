'use strict'

const Promise = require('bluebird')
const limit = require('limiter')
const R = require('ramda')

class RateLimiter {
  constructor (rules = [
    {interval: 10, limit: 10},
    {interval: 600, limit: 500}]) {
    this._rules = rules
    this._limiters = []

    for (let i = 0, len = rules.length; i < len; i++) {
      this._limiters.push(new limit.RateLimiter(
        rules[i].limit,
        rules[i].interval * 1000
      ))
    }
  }

  wait () {
    return Promise.all(R.map(l => new Promise((resolve, reject) => {
      l.removeTokens(1, (err, res) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(res)
        }
      })
    }), this._limiters))
    .then(R.reduce(R.min, Infinity))
  }

  // hitLimit (time) {
  //   return Promise.delay(time * 100)
  // }
}

module.exports = RateLimiter
