'use strict'

const restPoint = {
  fullName: 'team-v2.4',
  name: 'team',
  version: '2.4'
}

const MAX_SUMMONER_IDS_PER_REQUEST = 10
const MAX_TEAM_IDS_PER_REQUEST = 10

/**
 * Get teams mapped by summoner ID for a given list of summoner IDs
 *
 * @see Riot API: {@link https://developer.riotgames.com/api/methods#!/986/3358}
 * @param  {String} region      The region to search in
 * @param  {String[]} summonerIds A list of summoner ids
 * @return {external:Promise}  A Promise
 * @fulfil {Object}
 * @reject {Error}
 * @instance
 * @memberof Ashe
 */
function getTeamsBySummonerIds (region, summonerIds) {
  var requestParams = {
    rest: restPoint,
    caller: 'getTeamsBySummonerIds',
    region: region,
    data: summonerIds,
    url: `${this._genURL(region, restPoint)}/by-summoner`,
    maxObjs: MAX_SUMMONER_IDS_PER_REQUEST,
    cache: {
      ttl: 1800,
      keyFn: summonerId => `teams-for-summoner-${summonerId}`,
      saveIfNull: false
    }
  }

  return this._makeMultiRequest(requestParams)
}

/**
 * Get teams mapped by team ID for a given list of team IDs
 *
 * @see Riot API: {@link https://developer.riotgames.com/api/methods#!/986/3357}
 * @param  {String} region      The region to search in
 * @param  {String[]} summonerIds A list of team ids
 * @return {external:Promise}  A Promise
 * @fulfil {Object}
 * @reject {Error}
 * @instance
 * @memberof Ashe
 */
function getTeamsByIds (region, teamIds) {
  var requestParams = {
    rest: restPoint,
    caller: 'getTeamsByIds',
    region: region,
    data: teamIds,
    url: this._genURL(region, restPoint),
    maxObjs: MAX_TEAM_IDS_PER_REQUEST,
    cache: {
      ttl: 1800,
      keyFn: teamId => `team-${teamId}`,
      saveIfNull: false
    }
  }

  return this._makeMultiRequest(requestParams)
}

module.exports = {
  restPoint,
  methods: {
    getTeamsBySummonerIds,
    getTeamsByIds
  }
}

