'use strict'

const R = require('ramda')

const restPoint = {
  fullName: 'match-v2.2',
  name: 'match',
  version: '2.2'
}

function getMatch (region, matchId, options = {
  includeTimeline: false
}) {
  var opts = R.pick(['includeTimeline'], options)
  var tlString = opts.includeTimeline ? 'timeline' : 'noTimeline'
  var requestParams = {
    rest: restPoint,
    caller: 'getMatch',
    region: region,
    url: `${this._genURL(region, restPoint)}/by-summoner/${matchId}`,
    queryParams: opts,
    cache: {
      ttl: 1800,
      key: `match-${tlString}-${matchId}`,
      saveIfNull: true
    }
  }

  return this._makeCachedRequest(requestParams)
}

module.exports = {
  restPoint,
  methods: {
    getMatch
  }
}
