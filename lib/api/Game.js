'use strict'

const restPoint = {
  fullName: 'game-v1.3',
  name: 'game',
  version: '1.3'
}

/**
 * Returns the recent games for a summoner id in the given region
 *
 * @see Riot API: {@link https://developer.riotgames.com/api/methods#!/1078/3718}
 * @param  {String} region     the region to search in for the summoner
 * @param  {String} summonerId id of the summoner to look up
 * @return {external:Promise}  A promise whoes resolved value
 *         contains the recent games for the summoner or `null` if none
 *         are found
 *
 * @fulfil {Object}
 * @reject {Error}
 * @instance
 * @memberof Ashe
 */
function getRecentGamesForSummoner (region, summonerId) {
  var requestParams = {
    rest: restPoint,
    caller: 'getRecentGamesForSummoner',
    region: region,
    url: `${this._genURL(region, restPoint)}/by-summoner/${summonerId}/recent`,
    cache: {
      ttl: 1800,
      key: `games-${summonerId}`,
      saveIfNull: true
    }
  }

  return this._makeCachedRequest(requestParams)
}

module.exports = {
  restPoint,
  methods: {
    getRecentGamesForSummoner
  }
}
