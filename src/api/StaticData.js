'use strict'

const R = require('ramda')

const restPoint = {
  fullName: 'static-data-v1.2',
  name: 'static-data',
  version: '1.2'
}

const genUrl = (region) => {
  return `https://global.api.pvp.net/api/lol/${restPoint.name}/${region}/v${restPoint.version}`
}

// valid champ data
/* all, allytips, altimages, blurb, enemytips,
 * image, info, lore, partype, passive, recommended,
 * skins, spells, stats, tags
 */
function getChampions (region, options) {
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
    url: `${genUrl(region)}/champion`,
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
