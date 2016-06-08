'use strict'

const restPoint = {
  fullName: 'featured-games-v1.0',
  name: 'featured-games',
  version: '1.0'
}

function getFeaturedGames (region = 'na') {
  var requestParams = {
    rest: restPoint,
    caller: 'getFeaturedGames',
    region: region,
    url: `https://${region}.api.pvp.net/observer-mode/rest/featured`,
    cache: {
      ttl: 600,
      key: 'featuredGame',
      saveIfNull: false
    }
  }

  return this._makeCachedRequest(requestParams)
}

module.exports = {
  restPoint,
  methods: {
    getFeaturedGames
  }
}
