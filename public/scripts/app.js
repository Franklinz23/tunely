/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */
var albumList;
var template;

/* hard-coded data! */

/* end of hard-coded data */




$(document).ready(function() {
  console.log('app.js loaded!');

$albumList = $('#albums');

var source = $('#album-template').html();
    template = Handlebars.compile(source);



  });

$.ajax({
  method: 'GET',
  url: '/api/albums',
  success: onSuccess,
  error: onError
});

// this function takes a single album and renders it to the page
function renderAlbums(album) {
  console.log('rendering album:', album);

  var albumHTML = template({ album: album  });

  $albumList.prepend(albumHTML);
}

function onSuccess(albums) {
  albums.forEach( function(album) {
  renderAlbums(album);
});

}

function onError(err) {
  console.log("error", err);
}
