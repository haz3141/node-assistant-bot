# node-assistant-bot
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## Problem & Solution

The goal here is to create a CLI application that takes in a command and a query. The command tells the app what kind of search to perform with the query. In this case the app will search Spotify for a song, OMDB for a movie, or Bands in Town for an event using a solo artist or group as the query.

## Preview



## Getting Started

Simply clone the repository, run npm install, provide your own API keys in a .env file, and run one of the following commands with a query afterwards:

* `concert-this`

* `spotify-this-song`

* `movie-this`

* `do-what-it-says`

### Prerequisites

What things you need to install the software and how to install them

```
Node.js
Node Package Manager
API Keys
```

#### Installing

```
npm install
provide .env w/ keys
random.txt contains command to be executed as if it were terminal input
```

## Built With

* [Moment](https://www.npmjs.com/package/moment)
   
* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
   
* [Axios](https://www.npmjs.com/package/axios)

* [OMDB API](http://www.omdbapi.com)

* [DotEnv](https://www.npmjs.com/package/dotenv)

* [Chalk](https://www.npmjs.com/package/chalk)

* [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

## Authors

* **Hazael Dominguez** - *Project Head* - [haz3141](https://github.com/haz3141)

## Acknowledgments

* Hat tip to Node.JS
* Command Line Interfaces
* etc
