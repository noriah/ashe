# Ashe

[![Code Climate](https://codeclimate.com/github/amreuland/ashe/badges/gpa.svg)](https://codeclimate.com/github/amreuland/ashe)
[![Dependency Status](https://david-dm.org/amreuland/ashe.svg)](https://david-dm.org/amreuland/ashe)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

A library for accessing the riot api based *loosely* around lol-js

### Features
- Promisified
 - All Ashe functions return promises. Isn't that nice
- Limit-By-Region - Riot limits api calls by region, so Ashe does too
 - If one region gets limited, the others keep going
 - Ashe knows how to handle 429 codes and headers
- Caching - Ashe is ready to cache your data, making multiple calls lightning fast
 - Cache-then-Network flow - Check cache first, then make a call
 - Designed with Redis
 - Any cache that has `get` and `set` functions will do
- Seperate region workers
 - All calls to the api are separated by region, and each region has its own 'thread'
 - Multiple calls to the same method, with different regions are asynchronous
- Automatic retry
 - Ashe will retry up to five times if an error occurs


### Usage

Basic Usage
=
```javascript
// import Ashe
const Ashe = require('ashe')

// make a new client
var client = new Ashe('########-####-####-####-############')

// call your methods
var champions = client.getChampions('na')
```

With a Redis Cache
=

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

### Full Documentation
I'm working on it
