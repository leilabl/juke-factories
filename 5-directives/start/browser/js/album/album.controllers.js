'use strict';

/* ALBUMS (SINGULAR) CONTROLLER */

juke.controller('AlbumCtrl', function ($scope, $log, PlayerFactory, theAlbum) {

  $scope.album = theAlbum;
  
});

/* ALBUMS (PLURAL) CONTROLLER */

juke.controller('AlbumsCtrl', function ($scope, allAlbums) {

  $scope.albums = allAlbums;

});

juke.directive('albumList', function(){
  return {
    restrict: 'E',
    templateUrl: '/js/album/templates/albums.html',
    scope: {
      albums: '=', //this binds from the html where directive is used
    }
  }
})
