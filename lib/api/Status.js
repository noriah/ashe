'use strict'

const restPoint = {
  fullName: 'status-v1.0',
  name: 'status',
  version: '1.0'
}

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

function getRegionShardStatus (region) {
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
