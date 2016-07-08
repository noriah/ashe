'use strict'

const restPoint = {
  fullName: 'status-v1.0',
  name: 'status',
  version: '1.0'
}

/**
 * Get the list of status shards for the RIOT api
 *
 * @see Riot API: {@link https://developer.riotgames.com/api/methods#!/1085/3740}
 * @return {external:Promise} A Promise
 * @fulfil {Object}
 * @reject {Error}
 * @instance
 * @memberof Ashe
 */
function getStatusShardList () {
  var requestParams = {
    rest: restPoint,
    caller: 'getStatusShardList',
    region: 'global',
    url: 'https://status.leagueoflegends.com/shards',
    cache: {
      ttl: 3600,
      key: 'shards',
      saveIfNull: false
    }
  }

  return this._makeCachedRequest(requestParams)
}

/**
 * Get shard status.
 *
 * Returns the data available on the status.leagueoflegends.com website for the given region.
 *
 * @see Riot API: {@link https://developer.riotgames.com/api/methods#!/1085/3739}
 * @param  {String} region The region to check status on
 * @return {external:Promise}  A Promise
 * @fulfil {Object}
 * @reject {Error}
 * @instance
 * @memberof Ashe
 */
function getRegionShardStatus (region = 'na') {
  var requestParams = {
    rest: restPoint,
    caller: 'getRegionShardStatus',
    region: 'global',
    url: `https://status.leagueoflegends.com/shards/${region}`,
    cache: {
      ttl: 3600,
      key: 'shards',
      saveIfNull: false
    }
  }

  return this._makeCachedRequest(requestParams)
}

module.exports = {
  restPoint,
  methods: {
    getStatusShardList,
    getRegionShardStatus
  }
}
