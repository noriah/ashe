'use strict'

const restPoint = {
  fullName: 'game-v1.3',
  name: 'game',
  version: '1.3'
}

function getRecentGamesForSummoner (region, summonerId, options) {
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
