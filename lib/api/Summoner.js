'use strict'

const R = require('ramda')

const restPoint = {
  fullName: 'summoner-v1.4',
  name: 'summoner',
  version: '1.4'
}

const TTL_SUMMONER_NAME = 259200
const TTL_SUMMONER_ID = 259200
const TTL_SUMMONER_MASTERIES = 3600
const TTL_SUMMONER_RUNES = 3600

const MAX_SUMMONER_BY_NAME_REQUEST = 40
const MAX_SUMMONER_BY_ID_REQUEST = 40

const standardizeIt = R.compose(R.replace(/ /g, ''), R.toLower)

function getSummonersByName (region, summonerNames) {
  var stdSummonerNames = R.map(standardizeIt, summonerNames)
  var stdReqNameMap = R.zipObj(stdSummonerNames, summonerNames)

  var requestParams = {
    rest: restPoint,
    caller: 'getSummonersByName',
    region: region,
    data: stdSummonerNames,
    url: `${this._genUrl(region, restPoint)}/by-name`,
    maxObjs: MAX_SUMMONER_BY_NAME_REQUEST,
    cache: {
      ttl: TTL_SUMMONER_NAME,
      keyFn: summonerName => `summonerByName-${summonerName}`,
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
}

function getSummonersById (region, summonerIds) {
  var requestParams = {
    rest: restPoint,
    caller: 'getSummonersById',
    region: region,
    data: summonerIds,
    url: this._genUrl(region, restPoint),
    maxObjs: MAX_SUMMONER_BY_ID_REQUEST,
    cache: {
      ttl: TTL_SUMMONER_ID,
      keyFn: summonerId => `summonerById-${summonerId}`,
      saveIfNull: true
    }
  }

  return this._makeMultiRequest(requestParams)
}

function getSummonersMasteries (region, summonerIds) {
  var requestParams = {
    rest: restPoint,
    caller: 'getSummonersMasteries',
    region: region,
    data: summonerIds,
    url: this._genUrl(region, restPoint),
    suffix: '/masteries',
    maxObjs: MAX_SUMMONER_BY_ID_REQUEST,
    cache: {
      ttl: TTL_SUMMONER_MASTERIES,
      keyFn: summonerId => `summonerMasteries-${summonerId}`,
      saveIfNull: true
    }
  }

  return this._makeMultiRequest(requestParams)
}

function getSummonersNames (region, summonerIds) {
  var requestParams = {
    rest: restPoint,
    caller: 'getSummonersNames',
    region: region,
    data: summonerIds,
    url: this._genUrl(region, restPoint),
    suffix: '/name',
    maxObjs: MAX_SUMMONER_BY_ID_REQUEST,
    cache: {
      ttl: TTL_SUMMONER_ID,
      keyFn: summonerId => `summonerName-${summonerId}`,
      saveIfNull: true
    }
  }

  return this._makeMultiRequest(requestParams)
}

function getSummonersRunes (region, summonerIds) {
  var requestParams = {
    rest: restPoint,
    caller: 'getSummonersRunes',
    region: region,
    data: summonerIds,
    url: this._genUrl(region, restPoint),
    suffix: '/runes',
    maxObjs: MAX_SUMMONER_BY_ID_REQUEST,
    cache: {
      ttl: TTL_SUMMONER_RUNES,
      keyFn: summonerId => `summonerRunes-${summonerId}`,
      saveIfNull: true
    }
  }

  return this._makeMultiRequest(requestParams)
}

module.exports = {
  restPoint,
  methods: {
    getSummonersByName,
    getSummonersById,
    getSummonersMasteries,
    getSummonersNames,
    getSummonersRunes
  }
}
