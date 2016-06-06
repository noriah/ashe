'use strict'

const { genUrl } = require('../util')

const restPoint = {
  fullName: 'stats-v1.3',
  name: 'stats',
  version: '1.3'
}

const TTL_TIME_RANKED = 900
const TTL_TIME_SUMMARY = 900

module.exports = {
  restPoint,
  methods: {
    getStatsRanked: function (region, summonerId) {
      var requestParams = {
        rest: restPoint,
        caller: 'getStatsRanked',
        region: region,
        url: `${genUrl(region, restPoint)}/by-summoner/${summonerId}/ranked`,
        cache: {
          ttl: TTL_TIME_RANKED,
          key: `stats-${summonerId}-ranked`,
          saveIfNull: true
        }
      }

      return this._makeCachedRequest(requestParams)
    },

    getStatsSummary: function (region, summonerId) {
      var requestParams = {
        rest: restPoint,
        caller: 'getStatsSummary',
        region: region,
        url: `${genUrl(region, restPoint)}/by-summoner/${summonerId}/summary`,
        cache: {
          ttl: TTL_TIME_SUMMARY,
          key: `stats-${summonerId}-summary`,
          saveIfNull: true
        }
      }

      return this._makeCachedRequest(requestParams)
    }
  }
}
