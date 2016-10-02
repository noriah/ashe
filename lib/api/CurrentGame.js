'use strict'

const restPoint = {
  fullName: 'current-game-v1.0',
  name: 'current-game',
  version: '1.0'
}

/**
 * Gets the current game info for the requested summoner and region
 *
 * @see Riot API: {@link https://developer.riotgames.com/api/methods#!/976/3336}
 * @param  {string} region     The region for the player see (REGION STUFF)
 * @param  {string} summonerId ID of the summoner to get info
 * @return {external:Promise}            A Promise whoes resolved value contains the
 *                                data of the current game for the summoner
 *                                requestin the region or `null` if not in a
 *                                game or not found
 * @fulfil {Object}
 * @reject {Error}
 * @instance
 * @memberof Ashe
 */
function getCurrentGame (region, summonerId) {
  var platform = region.toUpperCase()
  if (platform !== 'KR' && platform !== 'RU') {
    platform = platform + '1'
  }
  if (platform === 'OCE1') {
    platform = 'OC1'
  }
  if (platform === 'EUNE1') {
    platform = 'EUN1'
  }

  var requestParams = {
    rest: restPoint,
    caller: 'getCurrentGame',
    region: region,
    url: `https://${region}.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/${platform}/${summonerId}`,
    cache: {
      ttl: 10,
      key: `currentGame:${summonerId}`,
      saveIfNull: false
    }
  }

  return this._makeCachedRequest(requestParams)
}

module.exports = {
  restPoint,
  methods: {
    getCurrentGame
  }
}
