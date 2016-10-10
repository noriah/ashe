# Ashe

[![Code Climate](https://codeclimate.com/github/noriah/ashe/badges/gpa.svg)](https://codeclimate.com/github/noriah/ashe)
[![Dependency Status](https://gemnasium.com/badges/github.com/noriah/ashe.svg)](https://gemnasium.com/github.com/noriah/ashe)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm-version](https://img.shields.io/npm/v/ashe.svg)](https://www.npmjs.com/package/ashe)

A library for accessing the riot api based loosely around lol-js

Tests will be written soon

Documentation: <http://noriah.github.io/ashe/docs/index.html>

## Features
- All Ashe functions return promises. Isn't that nice
- Limit-By-Region - Riot limits api calls by region, so Ashe does too
- Caching - Ashe is ready to cache your data, making multiple calls lightning fast
- All calls to the api are separated by region, and each region has its own 'thread'
- Ashe will retry up to five times if an error occurs

## Installation
```bash
npm install ashe
```

### Current API Versions
- championmastery-v???
- current-game-v1.0
- featured-games-v1.0
- lol-status-v1.0
- league-v2.5
- match-v2.2
- stats-v1.3
- summoner-v1.4
- team-v2.4
