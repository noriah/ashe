'use strict'

const restPoint = {
  fullName: 'stats-v1.3',
  name: 'stats',
  version: '1.3'
}

const TTL_TIME_RANKED = 900
const TTL_TIME_SUMMARY = 900

/**
 * Get the status of a summoner in the ranked scene for a region
 *
 * Includes ranked stats for Twisted Treeline and Summoner's Rift.
 *
 * @see Riot API: {@link https://developer.riotgames.com/api/methods#!/1080/3725}
 * @param  {String} region     the region to search in
 * @param  {String} summonerId the summoner to get data for
 * @return {external:Promise}  A Promise
 * @fulfil {Object}
 * @reject {Error}
 * @instance
 * @memberof Ashe
 */
function getStatsRanked (region, summonerId) {
  var requestParams = {
    rest: restPoint,
    caller: 'getStatsRanked',
    region: region,
    url: `${this._genURL(region, restPoint)}/by-summoner/${summonerId}/ranked`,
    cache: {
      ttl: TTL_TIME_RANKED,
      key: `stats-${summonerId}-ranked`,
      saveIfNull: true
    }
  }

  return this._makeCachedRequest(requestParams)
}

/**
 * Get the status of a summoner for a region
 *
 * NOT COMPLETED: One summary is returned per queue type.
 *
 * @see Riot API: {@link https://developer.riotgames.com/api/methods#!/1080/3726}
 * @param  {String} region     the region to search in
 * @param  {String} summonerId the summoner to get data for
 * @return {external:Promise}  A Promise
 * @fulfil {Object}
 * @reject {Error}
 * @instance
 * @memberof Ashe
 */
function getStatsSummary (region, summonerId) {
  var requestParams = {
    rest: restPoint,
    caller: 'getStatsSummary',
    region: region,
    url: `${this._genURL(region, restPoint)}/by-summoner/${summonerId}/summary`,
    cache: {
      ttl: TTL_TIME_SUMMARY,
      key: `stats-${summonerId}-summary`,
      saveIfNull: true
    }
  }

  return this._makeCachedRequest(requestParams)
}

module.exports = {
  restPoint,
  methods: {
    getStatsRanked,
    getStatsSummary
  }
}
