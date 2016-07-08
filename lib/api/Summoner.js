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

/**
 * Get summoner objects mapped by standardized summoner name for a given list of summoner names
 *
 * *NOTE*: The function already handles standardizing the names. Returned data
 * will have the same key as the name provided
 *
 * The response object contains the summoner objects mapped by the standardized
 * summoner name, which is the summoner name in all lower case and with spaces
 * removed. Use this version of the name when checking if the returned object
 * contains the data for a given summoner. This API will also accept standardized
 * summoner names as valid parameters, although they are not required.
 *
 * @see Riot API: {@link https://developer.riotgames.com/api/methods#!/1079/3722}
 * @param  {String} region        The region to search in
 * @param  {String[]} summonerNames A list of summoner names
 * @return {external:Promise}  A Promise
 * @fulfil {Object}
 * @reject {Error}
 * @instance
 * @memberof Ashe
 */
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

/**
 * Get summoner objects mapped by summoner ID for a given list of summoner IDs
 *
 * @see Riot API: {@link https://developer.riotgames.com/api/methods#!/1079/3724}
 * @param  {String} region      The region to search in
 * @param  {String[]} summonerIds A list of summoner ids
 * @return {external:Promise}  A Promise
 * @fulfil {Object}
 * @reject {Error}
 * @instance
 * @memberof Ashe
 */
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

/**
 * Get mastery pages mapped by summoner ID for a given list of summoner IDs
 *
 * @see Riot API: {@link https://developer.riotgames.com/api/methods#!/1079/3723}
 * @param  {String} region      The region to search in
 * @param  {String[]} summonerIds A list of summoner ids
 * @return {external:Promise}  A Promise
 * @fulfil {Object}
 * @reject {Error}
 * @instance
 * @memberof Ashe
 */
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

/**
 * Get summoner names mapped by summoner ID for a given list of summoner IDs
 *
 * @see Riot API: {@link https://developer.riotgames.com/api/methods#!/1079/3720}
 * @param  {String} region      The region to search in
 * @param  {String[]} summonerIds A list of summoner ids
 * @return {external:Promise}             A Promise
 * @fulfil {Object}
 * @reject {Error}
 * @instance
 * @memberof Ashe
 */
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

/**
 * Get rune pages mapped by summoner ID for a given list of summoner IDs
 *
 * @see Riot API: {@link https://developer.riotgames.com/api/methods#!/1079/3719}
 * @param  {String} region      The region to search in
 * @param  {String[]} summonerIds A list of summoner ids
 * @return {external:Promise}             A Promise
 * @fulfil {Object}
 * @reject {Error}
 * @instance
 * @memberof Ashe
 */
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
