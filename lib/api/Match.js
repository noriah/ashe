'use strict'

const R = require('ramda')

const restPoint = {
  fullName: 'match-v2.2',
  name: 'match',
  version: '2.2'
}

/**
 * Retrieve match by ID
 *
 * Not all matches have timeline data. If timeline data is requested,
 * but doesn't exist, then the response won't include it.
 *
 * @see  Riot API: {@link https://developer.riotgames.com/api/methods#!/1064/3671}
 * @param  {String} region  region to search in
 * @param  {String} matchId the match id
 * @param  {Object} options options (includeTimeline ({boolean}))
 * @return {external:Promise}  A Promise
 * @fulfil {Object}
 * @reject {Error}
 * @instance
 * @memberof Ashe
 */
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
      key: `match:${tlString}:${matchId}`,
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
