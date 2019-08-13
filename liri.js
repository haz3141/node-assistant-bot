require('dotenv').config();

const Keys = require('./keys.js');
const Axios = require('axios');
const Spotify = require('node-spotify-api');

const spotify = new Spotify(Keys.spotify);

const command = process.argv[2];
const argument = process.argv.slice(3).join(' ');

const spotifyThis = (song) => {
	spotify
		.search({ type: 'track', query: song, limit: 1 })
		.then(function(response) {
			const result = response.tracks.items[0];
			const artist = result.artists[0].name;
			const song = result.name;
			const link = response.tracks.items[0].preview_url;
			const album = result.album.name;

            console.log(`Spotify Results:`)
			console.log(`Artist: ${artist}`);
			console.log(`Song: ${song}`);
			console.log(`Preview: ${link}`);
			console.log(`Album: ${album}`);
		})
		.catch(function(err) {
			console.log(err);
		});
};

switch (command) {
	case 'spotify-this-song':
		spotifyThis(argument);
		break;

	default:
		break;
}
