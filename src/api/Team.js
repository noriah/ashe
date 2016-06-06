'use strict'

const { genUrl } = require('../util')

const MAX_SUMMONER_IDS_PER_REQUEST = 10
const MAX_TEAM_IDS_PER_REQUEST = 10

const restPoint = {
  fullName: 'team-v2.4',
  name: 'team',
  version: '2.4'
}

module.exports = {
  restPoint,
  methods: {
    getTeamsBySummonerIds: function (region, summonerIds) {
      var requestParams = {
        rest: restPoint,
        caller: 'getTeamsBySummonerIds',
        region: region,
        data: summonerIds,
        url: `${genUrl(region, restPoint)}/by-summoner`,
        maxObjs: MAX_SUMMONER_IDS_PER_REQUEST,
        cache: {
          ttl: 1800,
          keyFn: summonerId => `teams-for-summoner-${summonerId}`,
          saveIfNull: false
        }
      }

      return this._makeMultiRequest(requestParams)
    },

    getTeamsByIds: function (region, summonerIds) {
      var requestParams = {
        rest: restPoint,
        caller: 'getTeamsByIds',
        region: region,
        data: summonerIds,
        url: genUrl(region, restPoint),
        maxObjs: MAX_TEAM_IDS_PER_REQUEST,
        cache: {
          ttl: 1800,
          keyFn: teamId => `team-${teamId}`,
          saveIfNull: false
        }
      }

      return this._makeMultiRequest(requestParams)
    }

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

