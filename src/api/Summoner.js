'use strict'

const R = require('ramda')

const { genUrl } = require('../util')

const restPoint = {
  fullName: 'summoner-v1.4',
  name: 'summoner',
  version: '1.4'
}

const TTL_TIMES_SUMMONER_NAME = 259200
const TTL_TIMES_SUMMONER_ID = 259200

const MAX_SUMMONER_BY_NAME_REQUEST = 40
const MAX_SUMMONER_BY_ID_REQUEST = 40

const standardizeIt = R.compose(R.replace(/ /g, ''), R.toLower)

module.exports = {
  restPoint,
  methods: {
    getSummonersByName: function (region, summonerNames) {
      var stdSummonerNames = R.map(standardizeIt, summonerNames)
      var stdReqNameMap = R.zipObj(stdSummonerNames, summonerNames)

      var requestParams = {
        rest: restPoint,
        caller: 'getSummonersByName',
        region: region,
        data: stdSummonerNames,
        url: `${genUrl(region, restPoint)}/by-name`,
        maxObjs: MAX_SUMMONER_BY_NAME_REQUEST,
        cache: {
          ttl: TTL_TIMES_SUMMONER_NAME,
          keyFn: summoner => `summonerName-${summoner}`,
          saveIfNull: true
        }
      }

      return this._makeMultiRequest(requestParams)
      .then(res => {
        var remake = {}
        for (let [stdName, sName] of R.toPairs(stdReqNameMap)) {
          remake[sName] = res[stdName]
        }
        return remake
      })

      // return
    },

    getSummonersById: function (region, summonerIds) {
      var requestParams = {
        rest: restPoint,
        caller: 'getSummonersById',
        region: region,
        data: summonerIds,
        url: genUrl(region, restPoint),
        maxObjs: MAX_SUMMONER_BY_ID_REQUEST,
        cache: {
          ttl: TTL_TIMES_SUMMONER_ID,
          keyFn: summoner => `summonerId-${summoner}`,
          saveIfNull: true
        }
      }

      return this._makeMultiRequest(requestParams)
    },

    getSummonerNames: function (region, summonerIds) {
      return this.getSummonersById(region, summonerIds).map(R.prop('name'))
    }
  }
}
