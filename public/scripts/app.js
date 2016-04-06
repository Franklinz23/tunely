/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */
var albumList;
var template;


$(document).ready(function() {
  console.log('app.js loaded!');

  $albumList = $('#albums');

  var source = $('#album-template').html();
  template = Handlebars.compile(source);



  //GET all albums
  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: onSuccess,
    error: onError
  });

  //POST new album
  $('#album-form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/albums',
      data: $(this).serialize(),
      success: newAlbumSuccess,
      error: onError
    });
    $('#album-form input').val("");
    $('#album-form text-area').val("");
  });



  $('#albums').on('click', '.add-song', function(e) {
    console.log('add-song clicked!');
    var currentAlbumId = $(this).closest('.album').data('album-id'); // "5665ff1678209c64e51b4e7b"
    console.log('id', currentAlbumId);
    $('#songModal').data('album-id', currentAlbumId);
    $('#songModal').modal();
    // handleNewSongSubmit();
  });


  $('#saveSong').on('click', function handleNewSongSubmit(e) {
    e.preventDefault();
    var $songVal = $('#songName').val();
    var $trackVal = $('#trackNumber').val();
    var currentAlbumId = $('#songModal').data('album-id');
    console.log("saved song");

    $.ajax({
      method: 'POST',
      url: '/api/albums/' + currentAlbumId + '/songs',
      data: {
        name: $songVal,
        trackNumber: $trackVal
      },
      success: newSongSuccess,
      error: onError
    });

  });

});

function newSongSuccess(newSong) {
  console.log(newSong);
  renderAlbums();
}


function newAlbumSuccess(newAlbum) {
  console.log(newAlbum);
  renderAlbums(newAlbum);

}

// this function takes a single album and renders it to the page
function renderAlbums(album) {
  console.log('rendering album:', album);

  var albumHTML = template({album: album});

  $albumList.prepend(albumHTML);
}

function onSuccess(albums) {
  albums.forEach(function(album) {
    renderAlbums(album);
  });

}

function onError(err) {
  console.log("error", err);
}
