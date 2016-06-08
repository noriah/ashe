# Ashe

[![Code Climate](https://codeclimate.com/github/amreuland/ashe/badges/gpa.svg)](https://codeclimate.com/github/amreuland/ashe)
[![Dependency Status](https://david-dm.org/amreuland/ashe.svg)](https://david-dm.org/amreuland/ashe)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

A library for accessing the riot api based *loosely* around lol-js

Tests will be written soon

## Features
- All Ashe functions return promises. Isn't that nice
- Limit-By-Region - Riot limits api calls by region, so Ashe does too
 - If one region gets limited, the others keep going
- Caching - Ashe is ready to cache your data, making multiple calls lightning fast
- All calls to the api are separated by region, and each region has its own 'thread'
- Ashe will retry up to five times if an error occurs

### Current API Versions
- current-game-v1.0
- featured-games-v1.0
- lol-status-v1.0
- league-v2.5
- match-v2.2
- stats-v1.3
- summoner-v1.4
- team-v2.4

## Installation
```bash
npm install ashe
```

## Usage

### Basic Usage

```javascript
// import Ashe
const Ashe = require('ashe')

// make a new client
var client = new Ashe('########-####-####-####-############')

// call your methods
var champions = client.getChampions('na')
```

### With a Redis Cache


```javascript
// import Ashe and redis
const Ashe = require('ashe')
const redis = require('redis')

// Make your redis client
var cacheClient = redis.createClient('redis://localhost:6379')

// make your Ashe client
var lolClient = new Ashe({
  apiKey: '########-####-####-####-############',
  cache: cacheClient
})

// call your methods
var champions = client.getChampions('na')
```

## Full Documentation
I'm working on it
