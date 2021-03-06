// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
    db = require('./models');
// generate a new express app and call it 'app'
var app = express();

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// We'll serve jQuery and bootstrap from a local bower cache avoiding CDNs
// We're placing these under /vendor to differentiate them from our own assets
app.use('/vendor', express.static(__dirname + '/bower_components'));

var controllers = require('./controllers');

//body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', controllers.api.index);


app.get('/api/albums', function(req, res) {

 db.Album.find(
   function(err, albums){
     if (err) {
       return console.log("index error: " + err );
     }
     res.json(albums);
   });

});

app.post('/api/albums', function(req, res){
  console.log("new album: ", req.body);
  var newAlbum = new db.Album(req.body);
  newAlbum.save(function handleSavedAlbum(err, savedAlbum) {
    res.json(savedAlbum);
  });

});

app.post('/api/albums/:album_id/songs', function(req, res) {
  console.log("new song", req.body);
  var newSong = new db.Song(req.body);
  newSong.save(function handleSavedSong(err, savedSong) {
    res.json(savedSong);
  });
  
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
