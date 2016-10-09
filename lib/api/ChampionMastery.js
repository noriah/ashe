'use strict'

const restPoint = {
  fullName: 'championmastery',
  name: 'championmastery'
}

/**
 * Gets a specific champion mastery stat from summoner
 *
 * @see Riot API: {@link https://developer.riotgames.com/api/methods#!/1091/3769}
 * @param {string} region     The region for the player see (REGION STUFF)
 * @param {string} summonerId ID of the summoner to get info
 * @param {string} championId ID of the champion to get info
 * @return {external:Promise} A Promise whose resolved value contains the data of the     *                             champion mastery stat for the summoner request in the region
 * @fulfil {Object}
 * @reject {Error}
 * @instance
 * @memberof Ashe
 */

 function getChampionMastery (region, summonerId, championId) {
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

   let requestParams = {
     rest: restPoint,
     caller: 'getChampionMastery',
     region: region,
     url: `https://${region}.api.pvp.net/championmastery/location/${platform}/player/${summonerId}/champion/${championId}`,
     cache: {
       ttl: 180,
       key: `championMastery:${summonerId}:${championId}`,
       saveIfNull: false
     }
   }

   return this._makeCachedRequest(requestParams)
 }

 /**
  * Gets champion mastery stats from summoner
  *
  * @see Riot API: {@link https://developer.riotgames.com/api/methods#!/1091/3768}
  * @param {string} region     The region for the player see (REGION STUFF)
  * @param {string} summonerId ID of the summoner to get info
  * @return {external:Promise} A Promise whose resolved value contains the data of the   *                        champion mastery stats for the summoner request in the region
  * @fulfil {Object}
  * @reject {Error}
  * @instance
  * @memberof Ashe
  */

function getChampionMasteryBySummoner (region, summonerId) {
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

  let requestParams = {
    rest: restPoint,
    caller: 'getChampionMasteryBySummoner',
    region: region,
    url: `https://${region}.api.pvp.net/championmastery/location/${platform}/player/${summonerId}/champions`,
    cache: {
      ttl: 300,
      key: `championMastery:${summonerId}`,
      saveIfNull: false
    }
  }

  return this._makeCachedRequest(requestParams);
}

/**
 * Gets champion mastery score from summoner
 *
 * @see Riot API: {@link https://developer.riotgames.com/api/methods#!/1091/3768}
 * @param {string} region     The region for the player see (REGION STUFF)
 * @param {string} summonerId ID of the summoner to get info
 * @return {external:Promise} A Promise whose resolved value contains the data of the   *                        champion mastery stats for the summoner request in the region
 * @fulfil {Object}
 * @reject {Error}
 * @instance
 * @memberof Ashe
 */

function getMasteryScore (region, summonerId) {
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

 let requestParams = {
   rest: restPoint,
   caller: 'getMasteryScore',
   region: region,
   url: `https://${region}.api.pvp.net/championmastery/location/${platform}/player/${summonerId}/score`,
   cache: {
     ttl: 300,
     key: `championMastery:${summonerId}:score`,
     saveIfNull: false
   }
 }

 return this._makeCachedRequest(requestParams);
}

/**
 * Gets top champion mastery champions from summoner
 *
 * @see Riot API: {@link https://developer.riotgames.com/api/methods#!/1091/3768}
 * @param {string} region     The region for the player see (REGION STUFF)
 * @param {string} summonerId ID of the summoner to get info
 * @return {external:Promise} A Promise whose resolved value contains the data of the   *                        champion mastery stats for the summoner request in the region
 * @fulfil {Object}
 * @reject {Error}
 * @instance
 * @memberof Ashe
 */

function getTopChampions (region, summonerId) {
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

 let requestParams = {
   rest: restPoint,
   caller: 'getTopChampions',
   region: region,
   url: `https://${region}.api.pvp.net/championmastery/location/${platform}/player/${summonerId}/topchampions`,
   cache: {
     ttl: 600,
     key: `championMastery:${summonerId}:topchampions`,
     saveIfNull: false
   }
 }

 return this._makeCachedRequest(requestParams);
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
