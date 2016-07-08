# Usage

## Basic Usage

```javascript
// import Ashe
var Ashe = require('ashe')

// make a new client
var client = new Ashe('########-####-####-####-############')

// call your methods
var champions = client.getChampions('na')
```

## With a Redis Cache


```javascript
// import Ashe and redis
var Ashe = require('ashe')
var redis = require('redis')

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
