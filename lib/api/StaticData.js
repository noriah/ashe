'use strict'

const R = require('ramda')

const restPoint = {
  fullName: 'static-data-v1.2',
  name: 'static-data',
  version: '1.2'
}

const genURL = region => {
  return `https://global.api.pvp.net/api/lol/${restPoint.name}/${region}/v${restPoint.version}`
}

// valid champ data
/* all, allytips, altimages, blurb, enemytips,
 * image, info, lore, partype, passive, recommended,
 * skins, spells, stats, tags
 */
/**
 * Get the champion data for a region
 *
 * Not all data specified is returned by default. See the champData parameter for more information.
 *
 * @see Riot API: {@link https://developer.riotgames.com/api/methods#!/1055/3633}
 * @param  {String} region  The region to get data for
 * @param  {Object} options An object of options
 * @return {external:Promise} A Promise
 * @fulfil {Object}
 * @reject {Error}
 * @instance
 * @memberof Ashe
 */
function getChampions (region = 'na', options = {}) {
  var opts = R.pick(['locale', 'version', 'dataById', 'champData'], options)
  var champData = (opts.champData || []).sort()
  var locString = opts.locale ? opts.locale : 'default'
  var idString = opts.dataById ? 'byId' : 'byKey'
  var versString = opts.version ? opts.version : 'latest'
  var cdString = champData.length > 0 ? R.join('_', champData) : 'default'
  var requestParams = {
    rest: restPoint,
    caller: 'getChampions',
    region: region,
    url: `${genURL(region)}/champion`,
    queryParams: opts,
    cache: {
      ttl: 3600,
      key: `champions-${locString}-${versString}-${idString}-${cdString}`,
      saveIfNull: false
    }
  }

  return this._makeCachedRequest(requestParams)
}

module.exports = {
  restPoint,
  methods: {
    getChampions
  }
}
