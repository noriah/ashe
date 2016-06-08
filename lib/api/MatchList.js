'use strict'

const restPoint = {
  fullName: 'matchlist-v2.2',
  name: 'matchlist',
  version: '2.2'
}

function getMatchList (region, summonerId, options) {
  var requestParams = {
    rest: restPoint,
    caller: 'getMatchList',
    region: region,
    url: `${this._genURL(region, restPoint)}/by-summoner/${summonerId}`,
    cache: {
      ttl: 1800,
      key: `mathlist-${summonerId}`,
      saveIfNull: true
    }
  }

  return this._makeCachedRequest(requestParams)
}

module.exports = {
  restPoint,
  methods: {
    getMatchList
  }
}
