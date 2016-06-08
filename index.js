'use strict'

const Ashe = require('./lib/client')
const constants = require('./lib/constants')

Ashe.Maps = constants.maps
Ashe.GameModes = constants.gameModes
Ashe.GameTypes = constants.gameTypes
Ashe.Regions = constants.regions
Ashe.QueueTypes = constants.queueTypes

module.exports = Ashe
