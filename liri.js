require('dotenv').config();

const Keys = require('./keys.js');
const Axios = require('axios');
const Spotify = require('node-spotify-api');
const moment = require('moment');
const fs = require('fs');
const chalk = require('chalk');

let command = process.argv[2];
let querySpace = process.argv.slice(3).join(' ');
let queryPlus = process.argv.slice(3).join('+');

const spotify = new Spotify(Keys.spotify);

const spotifyThis = (song) => {
	if (!song) {
		song = 'the sign ace of base';
	}

	spotify
		.search({ type: 'track', query: song, limit: 1 })
		.then(function(response) {
			const result = response.tracks.items[0];
			const artist = result.artists[0].name;
			const song = result.name;
			const link = response.tracks.items[0].preview_url;
			const album = result.album.name;

			console.log(chalk.green(`Spotify Results:`));
			console.log(chalk.green(`Artist: ${artist}`));
			console.log(chalk.green(`Song: ${song}`));
			console.log(chalk.green(`Preview: ${link}`));
			console.log(chalk.green(`Album: ${album}`));
		})
		.catch(function(err) {
			console.log(err);
		});
};

const movieThis = (movie) => {
	if (!queryPlus) {
		movie = 'mr+nobody';
	}
    const query = `http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=${Keys.omdb.key}`;

    Axios
        .get(query)
		.then(function(response) {
			if (response.data.Error) {
				return console.log(response.data.Error);
			}

            const title = response.data.Title;
            const year = response.data.Year;
            const imdbRating = response.data.Ratings[0].Value;
            const tomatoeRating = response.data.Ratings[1].Value;
            const country = response.data.Country;
            const language = response.data.Language;
            const plot = response.data.Plot;
            const actors = response.data.Actors;

            console.log(chalk.red(`OMDB Results:`));
            console.log(chalk.red(`Title: ${title}`));
            console.log(chalk.red(`Year: ${year}`));
            console.log(chalk.red(`IMDB Rating: ${imdbRating}`));
            console.log(chalk.red(`Rotten Tomatoes Rating: ${tomatoeRating}`));
            console.log(chalk.red(`Country: ${country}`));
            console.log(chalk.red(`Language: ${language}`));
            console.log(chalk.red(`Plot: ${plot}`));
            console.log(chalk.red(`Actors: ${actors}`));
		})
		.catch(function(error) {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log('---------------Data---------------');
				console.log(error.response.data);
				console.log('---------------Status---------------');
				console.log(error.response.status);
				console.log('---------------Status---------------');
				console.log(error.response.headers);
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an object that comes back with details pertaining to the error that occurred.
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
			}
			console.log(error.config);
		});
};

const concertThis = (artist) => {
	if (!artist) {
		artist = 'eminem';
	}

    const query = `https://rest.bandsintown.com/artists/${artist}/events?app_id=${Keys.bit.key}`;
	
	Axios
        .get(query)
		.then(function(response) {
			const data = response.data[0];
			const venue = data.venue.name;
			const location = `${data.venue.city}, ${data.venue.country}`;
			const date = moment(data.datetime).format('MM/DD/YYYY');
			const artist = data.lineup;
			
			console.log(chalk.cyan(`Lineup: ${artist}`));
			console.log(chalk.cyan(`Venue: ${venue}`));
			console.log(chalk.cyan(`Location: ${location}`));
			console.log(chalk.cyan(`Date: ${date}`));
		})
		.catch(function(error) {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log('---------------Data---------------');
				console.log(error.response.data);
				console.log('---------------Status---------------');
				console.log(error.response.status);
				console.log('---------------Status---------------');
				console.log(error.response.headers);
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an object that comes back with details pertaining to the error that occurred.
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
			}
			console.log(error.config);
		});
};

const doThis = () => {
	fs.readFile('random.txt', 'utf8', function(error, data) {
		if (error) {
			return console.log(error);
		}

		const dataArr = data.split(',');
		const command = dataArr[0];
		// remove quotes from the search term
		const query = dataArr[1].slice(1, -1);

		runApp(command, query);
	});
};

const runApp = (command, query) => {
	if (query) {
		querySpace = query.split(' ').join(' ');
		queryPlus = query.split(' ').join('+');
	}

	switch (command) {
		case 'spotify-this-song':
			spotifyThis(querySpace);
			break;
	
		case 'movie-this':
			movieThis(queryPlus);
			break;
			
		case 'concert-this':
			concertThis(queryPlus);
			break;
	
		case 'do-what-it-says':
			doThis();
			break;
	
		default:
			console.log(`Please enter a proper command and try again.`);
			break;
	}
};

runApp(command);