'use strict'

const restPoint = {
  fullName: 'featured-games-v1.0',
  name: 'featured-games',
  version: '1.0'
}

/**
 * Get a list of reatured games for a region
 *
 * @see Riot API: {@link https://developer.riotgames.com/api/methods#!/977/3337}
 * @param  {String} region The region to get featured games for
 * @return {external:Promise}        A Promise whoes resolved value contains the
 *                            list of featured games for a region
 * @fulfil {Object}
 * @reject {Error}
 * @instance
 * @memberof Ashe
 */
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
