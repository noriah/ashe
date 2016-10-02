'use strict'

const restPoint = {
  fullName: 'league-v2.5',
  name: 'league',
  version: '2.5'
}

const MAX_SUMMONER_IDS_PER_REQUEST = 10
const MAX_TEAM_IDS_PER_REQUEST = 10

/**
 * Returns all leagues for specified summoners and summoners' teams. Entries for
 * each requested participant (i.e., each summoner and related teams) will be
 * included in the returned leagues data, whether or not the participant is
 * inactive. However, no entries for other inactive summoners or teams in the
 * leagues will be included.
 *
 * @see  Riot Api: {@link https://developer.riotgames.com/api/methods#!/985/3351}
 * @param  {string} region      The region to search in
 * @param  {String[]} summonerIds A list of summoner ids to get data for
 * @return {external:Promise}  A Promise
 * @fulfil {Object}
 * @reject {Error}
 * @instance
 * @memberof Ashe
 */
function getLeaguesBySummonerId (region, summonerIds) {
  var requestParams = {
    rest: restPoint,
    caller: 'getLeaguesBySummonerId',
    region: region,
    data: summonerIds,
    url: `${this._genURL(region, restPoint)}/by-summoner`,
    maxObjs: MAX_SUMMONER_IDS_PER_REQUEST,
    cache: {
      ttl: 1800,
      keyFn: summonerId => `leagues:summoner:all:${summonerId}`,
      saveIfNull: false
    }
  }

  return this._makeMultiRequest(requestParams)
}

/**
 * Returns all league entries for specified summoners and summoners' teams.
 *
 * @see Riot API: {@link https://developer.riotgames.com/api/methods#!/985/3356}
 * @param  {string} region      The region to search in
 * @param  {Array<string>} summonerIds A list of summoner ids to get data for
 * @return {external:Promise}  A Promise
 * @fulfil {Object}
 * @reject {Error}
 * @instance
 * @memberof Ashe
 */
function getLeagueEntriesBySummonerId (region, summonerIds) {
  var requestParams = {
    rest: restPoint,
    caller: 'getLeagueEntriesBySummonerId',
    region: region,
    data: summonerIds,
    url: `${this._genURL(region, restPoint)}/by-summoner`,
    suffix: '/entry',
    maxObjs: MAX_SUMMONER_IDS_PER_REQUEST,
    cache: {
      ttl: 1800,
      keyFn: summonerId => `leagues:summoner:entries:${summonerId}`,
      saveIfNull: false
    }
  }

  return this._makeMultiRequest(requestParams)
}

/**
 * Returns all leagues for specified teams. Entries for eachrequested team
 * will be included in the returned leagues data, whether or not the team
 * is inactive. However, no entries for other inactive teams in the leagues
 * will be included.
 *
 * @see Riot API: {@link https://developer.riotgames.com/api/methods#!/985/3352}
 * @param  {String} region  The region to search in
 * @param  {String[]} teamIds A list of team ids
 * @return {external:Promise}  A Promise
 * @fulfil {Object}
 * @reject {Error}
 * @instance
 * @memberof Ashe
 */
function getLeaguesByTeamId (region, teamIds) {
  var requestParams = {
    rest: restPoint,
    caller: 'getLeaguesByTeamId',
    region: region,
    data: teamIds,
    url: `${this._genURL(region, restPoint)}/by-team`,
    maxObjs: MAX_TEAM_IDS_PER_REQUEST,
    cache: {
      ttl: 1800,
      keyFn: teamId => `leagues:team:all:${teamId}`,
      saveIfNull: false
    }
  }

  return this._makeMultiRequest(requestParams)
}

/**
 * Returns all league entries for specified teams.
 *
 * @see Riot API: {@link https://developer.riotgames.com/api/methods#!/985/3355}
 * @param  {String} region  The region to search in
 * @param  {String[]} teamIds A list of team ids
 * @return {external:Promise}  A Promise
 * @fulfil {Object}
 * @reject {Error}
 * @instance
 * @memberof Ashe
 */
function getLeagueEntriesByTeamId (region, teamIds) {
  var requestParams = {
    rest: restPoint,
    caller: 'getLeagueEntriesByTeamId',
    region: region,
    data: teamIds,
    url: `${this._genURL(region, restPoint)}/by-team`,
    suffix: '/entry',
    maxObjs: MAX_TEAM_IDS_PER_REQUEST,
    cache: {
      ttl: 1800,
      keyFn: teamId => `leagues:team:entries:${teamId}`,
      saveIfNull: false
    }
  }

  return this._makeMultiRequest(requestParams)
}

module.exports = {
  restPoint,
  methods: {
    getLeaguesBySummonerId,
    getLeagueEntriesBySummonerId,
    getLeaguesByTeamId,
    getLeagueEntriesByTeamId
  }
}

