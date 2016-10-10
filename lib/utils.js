'use strict'

const R = require('ramda')
const qs = require('querystring')

function getPlatform (region) {
  let platform = region.toUpperCase()

  if (platform !== 'KR' && platform !== 'RU') {
    platform = platform + '1'
  }
  if (platform === 'OCE1') {
    platform = 'OC1'
  }
  if (platform === 'EUNE1') {
    platform = 'EUN1'
  }

  return platform
}

function toOptsString (obj) {
  let keys = R.keys(obj)
  let modified = {}
  R.forEach(key => {
    if (R.isNil(obj[key])) {
      return
    }

    let value = obj[key]
    if (R.is(Array, value)) {
      value = R.join(',', value)
    }

    modified[key] = value
  }, keys)

  let result = qs.stringify(modified)
  return result
}

module.exports = {
  getPlatform,
  toOptsString
}
