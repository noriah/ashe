'use strict'

const maps = {
  '1': {
    name: 'Summoner\'s Rift',
    notes: 'Summer Variant'
  },
  '2': {
    name: 'Summoner\'s Rift',
    notes: 'Autumn Variant'
  },
  '3': {
    name: 'The Proving Grounds',
    notes: 'Tutorial Map'
  },
  '4': {
    name: 'Twisted Treeline',
    notes: 'Original Version'
  },
  '8': {
    name: 'The Crystal Scar',
    notes: 'Dominion Map'
  },
  '9': {
    name: 'WIPUpdate',
    notes: 'WIPUpdate'
  },
  '10': {
    name: 'Twisted Treeline',
    notes: 'Current Version'
  },
  '11': {
    name: 'Summoner\'s Rift',
    notes: 'Current Version'
  },
  '12': {
    name: 'Howling Abyss',
    notes: 'ARAM Map'
  },
  '14': {
    name: 'Butcher\'s Bridge',
    notes: 'ARAM Map'
  }
}

const gameModes = {
  CLASSIC: 'A Normal Game',
  ODIN: 'A Dominion/Crystal Scar Game',
  ARAM: 'ARAM',
  TUTORIAL: 'A Tutorial',
  ONEFORALL: 'One For All',
  ASCENSION: 'Ascension',
  FIRSTBLOOD: 'Snowdown Showdown',
  KINGPORO: 'Poro King',
  SIEGE: 'Nexus Seige'
}

const gameTypes = {
  CUSTOM_GAME: 'Custom Game',
  MATCHED_GAME: 'Normal Game',
  TUTORIAL_GAME: 'Tutorial'
}

const subTypes = {
  NONE: 'Custom',
  NORMAL: 'Summoner\'s Rift unranked',
  NORMAL_3x3: 'Twisted Treeline unranked',
  ODIN_UNRANKED: 'Dominion/Crystal Scar',
  ARAM_UNRANKED_5x5: 'ARAM',
  BOT: 'Summoner\'s Rift/Crystal Scar Bots',
  BOT_3X3: 'Twisted Treeline Bots',
  RANKED_SOLO_5x5: 'Summoner\'s Rift Ranked Solo',
  RANKED_TEAM_3x3: 'Twisted Treeline Ranked Team',
  RANKED_TEAM_5x5: 'Summoner\'s Rift Ranked Team',
  ONEFORALL_5x5: 'One for All',
  FIRSTBLOOD_1x1: 'Snowdown Showdown 1x1',
  FIRSTBLOOD_2x2: 'Snowdown Showdown 2x2',
  SR_6x6: 'Summoner\'s Rift 6x6 Hexakill',
  CAP_5x5: 'Team Builder',
  URF: 'Ultra Rapid Fire',
  URF_BOT: 'Ultra Rapid Fire Bots',
  NIGHTMARE_BOT: 'Summoner\'s Rift Nightmare Bots',
  ASCENSION: 'Ascension',
  HEXAKILL: 'Twisted Treeline 6x6 Hexakill',
  KING_PORO: 'King Poro',
  COUNTER_PICK: 'Nemesis',
  BILGEWATER: 'Black Market Brawlers',
  SIEGE: 'Nexus Siege'
}

const regions = {
  br: { name: 'Brazil' },
  eune: { name: 'EU Nordic & East' },
  euw: { name: 'EU West' },
  kr: { name: 'Korea' },
  lan: { name: 'Latin America North' },
  las: { name: 'Latin America South' },
  na: { name: 'North America' },
  oce: { name: 'Oceania' },
  pbe: {
    name: 'Public Beta Environment',
    isBeta: true
  },
  ru: { name: 'Russia' },
  tr: { name: 'Turkey' }
}

const queueTypes = {
  CUSTOM: {
    gameQueueConfigId: 0,
    name: 'Custom games'
  },
  NORMAL_5x5_BLIND: {
    gameQueueConfigId: 2,
    name: 'Normal 5v5 Blind Pick games'
  },
  BOT_5x5: {
    gameQueueConfigId: 7,
    name: 'Historical Summoner\'s Rift Coop vs AI games'
  },
  BOT_5x5_INTRO: {
    gameQueueConfigId: 31,
    name: 'Summoner\'s Rift Coop vs AI Intro Bot games'
  },
  BOT_5x5_BEGINNER: {
    gameQueueConfigId: 32,
    name: 'Summoner\'s Rift Coop vs AI Beginner Bot games'
  },
  BOT_5x5_INTERMEDIATE: {
    gameQueueConfigId: 33,
    name: 'Historical Summoner\'s Rift Coop vs AI Intermediate Bot games'
  },
  NORMAL_3x3: {
    gameQueueConfigId: 8,
    name: 'Normal 3v3 games'
  },
  NORMAL_5x5_DRAFT: {
    gameQueueConfigId: 14,
    name: 'Normal 5v5 Draft Pick games'
  },
  ODIN_5x5_BLIND: {
    gameQueueConfigId: 16,
    name: 'Dominion 5v5 Blind Pick games'
  },
  ODIN_5x5_DRAFT: {
    gameQueueConfigId: 17,
    name: 'Dominion 5v5 Draft Pick games'
  },
  BOT_ODIN_5x5: {
    gameQueueConfigId: 25,
    name: 'Dominion Coop vs AI games'
  },
  RANKED_SOLO_5x5: {
    gameQueueConfigId: 4,
    name: 'Ranked Solo 5v5 games'
  },
  RANKED_PREMADE_3x3: {
    gameQueueConfigId: 9,
    name: 'Ranked Premade 3v3 games'
  },
  RANKED_FLEX_TT: {
    gameQueueConfigId: 9,
    name: 'Ranked Flex 3x3 games'
  },
  RANKED_PREMADE_5x5: {
    gameQueueConfigId: 6,
    name: 'Ranked Premade 5v5 games'
  },
  RANKED_TEAM_3x3: {
    gameQueueConfigId: 41,
    name: 'Ranked Team 3v3 games'
  },
  RANKED_TEAM_5x5: {
    gameQueueConfigId: 42,
    name: 'Ranked Team 5v5 games'
  },
  BOT_TT_3x3: {
    gameQueueConfigId: 52,
    name: 'Twisted Treeline Coop vs AI games'
  },
  GROUP_FINDER_5x5: {
    gameQueueConfigId: 61,
    name: 'Team Builder games'
  },
  ARAM_5x5: {
    gameQueueConfigId: 65,
    name: 'ARAM games'
  },
  ONEFORALL_5x5: {
    gameQueueConfigId: 70,
    name: 'One for All games'
  },
  FIRSTBLOOD_1x1: {
    gameQueueConfigId: 72,
    name: 'Snowdown Showdown 1v1 games'
  },
  FIRSTBLOOD_2x2: {
    gameQueueConfigId: 73,
    name: 'Snowdown Showdown 2v2 games'
  },
  SR_6x6: {
    gameQueueConfigId: 75,
    name: 'Summoner\'s Rift 6x6 Hexakill games'
  },
  URF_5x5: {
    gameQueueConfigId: 76,
    name: 'Ultra Rapid Fire games'
  },
  BOT_URF_5x5: {
    gameQueueConfigId: 83,
    name: 'Ultra Rapid Fire games played against AI games'
  },
  NIGHTMARE_BOT_5x5_RANK1: {
    gameQueueConfigId: 91,
    name: 'Doom Bots Rank 1 games'
  },
  NIGHTMARE_BOT_5x5_RANK2: {
    gameQueueConfigId: 92,
    name: 'Doom Bots Rank 2 games'
  },
  NIGHTMARE_BOT_5x5_RANK5: {
    gameQueueConfigId: 93,
    name: 'Doom Bots Rank 5 games'
  },
  ASCENSION_5x5: {
    gameQueueConfigId: 96,
    name: 'Ascension games'
  },
  HEXAKILL: {
    gameQueueConfigId: 98,
    name: 'Twisted Treeline 6x6 Hexakill games'
  },
  KING_PORO_5x5: {
    gameQueueConfigId: 300,
    name: 'King Poro games'
  },
  COUNTER_PICK: {
    gameQueueConfigId: 310,
    name: 'Nemesis games'
  },
  TEAM_BUILDER_DRAFT_UNRANKED_5x5: {
    gameQueueConfigId: 400,
    name: 'Normal 5v5 Draft Pick games'
  },
  TEAM_BUILDER_DRAFT_RANKED_5x5: {
    gameQueueConfigId: 410,
    name: 'Ranked 5v5 Draft Pick games'
  },
  TEAM_BUILDER_RANKED_SOLO: {
    gameQueueConfigId: 420,
    name: 'Ranked Solo/Duo games'
  },
  RANKED_FLEX_SR: {
    gameQueueConfigId: 440,
    name: 'Ranked Flex 5x5 games'
  }
}

const constants = {
  maps,
  gameModes,
  gameTypes,
  subTypes,
  regions,
  queueTypes
}

module.exports = constants
