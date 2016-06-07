'use strict'

const restPoint = {
  fullName: 'team-v2.4',
  name: 'team',
  version: '2.4'
}

const MAX_SUMMONER_IDS_PER_REQUEST = 10
const MAX_TEAM_IDS_PER_REQUEST = 10

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

function getTeamsByIds (region, summonerIds) {
  var requestParams = {
    rest: restPoint,
    caller: 'getTeamsByIds',
    region: region,
    data: summonerIds,
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

    // getLeaguesByTeamId: function (region, teamIds) {
    //   var requestParams = {
    //     rest: restPoint,
    //     caller: 'getLeaguesByTeamId',
    //     region: region,
    //     data: teamIds,
    //     url: `${genUrl(region, restPoint)}/by-team`,
    //     maxObjs: MAX_TEAM_IDS_PER_REQUEST,
    //     cache: {
    //       ttl: 1800,
    //       keyFn: teamId => `leagues-team-${teamId}`,
    //       saveIfNull: false
    //     }
    //   }

    //   return this._makeMultiRequest(requestParams)
    // }
  }
}

