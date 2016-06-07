'use strict'

const restPoint = {
  fullName: 'league-v2.5',
  name: 'league',
  version: '2.5'
}

const MAX_SUMMONER_IDS_PER_REQUEST = 10
const MAX_TEAM_IDS_PER_REQUEST = 10

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
      keyFn: summonerId => `leagues-summoner-${summonerId}`,
      saveIfNull: false
    }
  }

  return this._makeMultiRequest(requestParams)
}

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
      keyFn: summonerId => `leagues-entry-summoner-${summonerId}`,
      saveIfNull: false
    }
  }

  return this._makeMultiRequest(requestParams)
}

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
      keyFn: teamId => `leagues-team-${teamId}`,
      saveIfNull: false
    }
  }

  return this._makeMultiRequest(requestParams)
}

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
      keyFn: teamId => `leagues-entry-team-${teamId}`,
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

