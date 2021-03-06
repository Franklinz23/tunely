// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");

var albumsList =[];

  albumsList.push({
               artistName: 'Ladyhawke',
               name: 'Ladyhawke',
               releaseDate: '2008, November 18',
               genres: [ 'new wave', 'indie rock', 'synth pop' ]
             });
  albumsList.push({
               artistName: 'The Knife',
               name: 'Silent Shout',
               releaseDate: '2006, February 17',
               genres: [ 'synth pop', 'electronica', 'experimental' ]
             });
  albumsList.push({
               artistName: 'Juno Reactor',
               name: 'Shango',
               releaseDate: '2000, October 9',
               genres: [ 'electronic', 'goa trance', 'tribal house' ]
             });
  albumsList.push({
               artistName: 'Philip Wesley',
               name: 'Dark Night of the Soul',
               releaseDate: '2008, September 12',
               genres: [ 'piano' ]
             });

var sampleSongs = [];

  sampleSongs.push({
                name: 'Swamped',
                trackNumber: 1
              });
  sampleSongs.push({
                name: "Heaven's a Lie",
                trackNumber: 2
              });
  sampleSongs.push({
                name: 'Daylight Dancer',
                trackNumber: 3
              });
  sampleSongs.push({
                name: 'Humane',
                trackNumber: 4
              });
  sampleSongs.push({
                name: 'Self Deception',
                trackNumber: 5
              });
  sampleSongs.push({
                name: 'Aeon',
                trackNumber: 6
              });
  sampleSongs.push({
                name: 'Tight Rope',
                trackNumber: 7
              });

albumsList.forEach(function(album) {
  album.songs = sampleSongs;
});

db.Album.remove({}, function(err, albums){

  db.Album.create(albumsList, function(err, albums){
    if (err) { return console.log('ERROR', err); }
    console.log("all albums:", albums);
    console.log("created", albums.length, "albums");
    process.exit();
  });

});
