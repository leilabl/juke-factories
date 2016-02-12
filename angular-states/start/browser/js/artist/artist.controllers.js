'use strict';

/* ARTISTS (PLURAL) CONTROLLER */

juke.controller('ArtistsCtrl', function ($scope, $log, $rootScope, ArtistFactory, artists) {

  $scope.$on('viewSwap', function (event, data) {
    if (data.name !== 'allArtists') return $scope.showMe = false;
    $scope.showMe = true;
  });

  $scope.artists = artists;

});

/* ARTIST (SINGULAR) CONTROLLER */

juke.controller('ArtistCtrl', function ($scope, $log, ArtistFactory, PlayerFactory, $rootScope, artist) {

  $scope.getCurrentSong = function () {
    return PlayerFactory.getCurrentSong();
  };

  $scope.isPlaying = function (song) {
    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
  };

  $scope.toggle = function (song) {
    if (song !== PlayerFactory.getCurrentSong()) {
      PlayerFactory.start(song, $scope.artist.songs);
    } else if ( PlayerFactory.isPlaying() ) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.resume();
    }
  };

  $scope.viewOneAlbum = function (album) {
    $rootScope.$broadcast('viewSwap', { name: 'oneAlbum', id: album._id });
  };

  $scope.artist = artist;
});
