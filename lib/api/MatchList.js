'use strict'

const restPoint = {
  fullName: 'matchlist-v2.2',
  name: 'matchlist',
  version: '2.2'
}

/**
 * Gets the list of matches for a summoner in a region
 *
 * NOT COMPLETE YET
 *
 * A number of optional parameters are provided for filtering. It is up to
 * the caller to ensure that the combination of filter parameters provided
 * is valid for the requested summoner, otherwise, no matches may be
 * returned. If either of the beginTime or endTime parameters is set, they
 * must both be set, although there is no maximum limit on their range. If
 * the beginTime parameter is specified on its own, endTime is assumed to
 * be the current time. If the endTime parameter is specified on its own,
 * beginTime is assumed to be the start of the summoner's match history.
 *
 * @see Riot API: {@link https://developer.riotgames.com/api/methods#!/1069/3683}
 * @param  {String} region     the region to search in
 * @param  {String} summonerId the summoner id to request data for
 * @param  {Object} options    Not yet completed
 * @return {external:Promise}  A Promise
 * @fulfil {Object}
 * @reject {Error}
 * @instance
 * @memberof Ashe
 */
function getMatchList (region, summonerId, options) {
  var requestParams = {
    rest: restPoint,
    caller: 'getMatchList',
    region: region,
    url: `${this._genURL(region, restPoint)}/by-summoner/${summonerId}`,
    cache: {
      ttl: 1800,
      key: `mathlist:${summonerId}`,
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
