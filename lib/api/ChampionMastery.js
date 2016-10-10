'use strict'

const getPlatform = require('../utils').getPlatform

const restPoint = {
  fullName: 'championmastery',
  name: 'championmastery'
}

const genURL = (region, platform, summonerId) => {
  return `https://${region}.api.pvp.net/${restPoint.name}/location/${platform}/player/${summonerId}`
}

/**
 * Get a champion mastery by player id and champion id.
 * Returns null if no masteries are found for given player id or player id
 * and champion id combination
 *
 * @see Riot API: {@link https://developer.riotgames.com/api/methods#!/1091/3769}
 * @param {string} region     The region for the player
 * @param {string} summonerId ID of the summoner to get info
 * @param {string} championId ID of the champion to get info
 * @return {external:Promise} A Promise whose resolved value contains the data of the
 *                              champion mastery stat for the summoner request in the region
 * @fulfil {Object}
 * @reject {Error}
 * @instance
 * @memberof Ashe
 */

function getChampionMastery (region, summonerId, championId) {
  let platform = getPlatform(region)

  let requestParams = {
    rest: restPoint,
    caller: 'getChampionMastery',
    region: region,
    url: `${genURL(region, platform, summonerId)}/champion/${championId}`,
    cache: {
      ttl: 180,
      key: `championMastery:${summonerId}:${championId}`,
      saveIfNull: false
    }
  }

  return this._makeCachedRequest(requestParams)
}

 /**
  * Get all champion mastery entries sorted by number of champion points descending
  *
  * @see Riot API: {@link https://developer.riotgames.com/api/methods#!/1091/3768}
  * @param {string} region     The region for the player
  * @param {string} summonerId ID of the summoner to get info
  * @return {external:Promise} A Promise whose resolved value contains the data of the
  *                              champion mastery stats for the summoner request in the region
  * @fulfil {Object}
  * @reject {Error}
  * @instance
  * @memberof Ashe
  */

function getChampionMasteryBySummoner (region, summonerId) {
  let platform = getPlatform(region)

  let requestParams = {
    rest: restPoint,
    caller: 'getChampionMasteryBySummoner',
    region: region,
    url: `${genURL(region, platform, summonerId)}/champions`,
    cache: {
      ttl: 300,
      key: `championMastery:${summonerId}:all`,
      saveIfNull: false
    }
  }

  return this._makeCachedRequest(requestParams)
}

/**
 * Get a player's total champion mastery score, which is sum of individual champion mastery levels
 *
 * @see Riot API: {@link https://developer.riotgames.com/api/methods#!/1091/3770}
 * @param {string} region     The region for the player
 * @param {string} summonerId ID of the summoner to get info
 * @return {external:Promise} A Promise whose resolved value contains the data of the
 *                              champion mastery stats for the summoner request in the region
 * @fulfil {Object}
 * @reject {Error}
 * @instance
 * @memberof Ashe
 */

function getMasteryScore (region, summonerId) {
  let platform = getPlatform(region)

  let requestParams = {
    rest: restPoint,
    caller: 'getMasteryScore',
    region: region,
    url: `${genURL(region, platform, summonerId)}/score`,
    cache: {
      ttl: 300,
      key: `championMastery:${summonerId}:score`,
      saveIfNull: false
    }
  }

  return this._makeCachedRequest(requestParams)
}

/**
 * Get specified number of top champion mastery entries sorted by number of champion points descending
 *
 * @see Riot API: {@link https://developer.riotgames.com/api/methods#!/1091/3764}
 * @param {string} region     The region for the player
 * @param {string} summonerId ID of the summoner to get info
 * @return {external:Promise} A Promise whose resolved value contains the data of the
 *                              champion mastery stats for the summoner request in the region
 * @fulfil {Object}
 * @reject {Error}
 * @instance
 * @memberof Ashe
 */

function getTopChampions (region, summonerId) {
  let platform = getPlatform(region)

  let requestParams = {
    rest: restPoint,
    caller: 'getTopChampions',
    region: region,
    url: `${genURL(region, platform, summonerId)}/topchampions`,
    cache: {
      ttl: 600,
      key: `championMastery:${summonerId}:topchampions`,
      saveIfNull: false
    }
  }

  return this._makeCachedRequest(requestParams)
}

module.exports = {
  restPoint,
  methods: {
    getChampionMastery,
    getChampionMasteryBySummoner,
    getMasteryScore,
    getTopChampions
  }
}
