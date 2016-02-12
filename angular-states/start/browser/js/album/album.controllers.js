'use strict';

/* ALBUMS (SINGULAR) CONTROLLER */

juke.controller('AlbumCtrl', function ($scope, $log, PlayerFactory, AlbumFactory, $stateParams) {

  // main toggle
  $scope.toggle = function (song) {
    if (song !== PlayerFactory.getCurrentSong()) {
      PlayerFactory.start(song, $scope.album.songs);
    } else if ( PlayerFactory.isPlaying() ) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.resume();
    }
  };

  $scope.getCurrentSong = function () {
    return PlayerFactory.getCurrentSong();
  };

  $scope.isPlaying = function (song) {
    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
  };

  AlbumFactory.fetchById($stateParams.albumId)
  .then(function (album) {
    $scope.album = album;
  }) 
  .catch($log.error);

});

/* ALBUMS (PLURAL) CONTROLLER */

juke.controller('AlbumsCtrl', function ($scope, $log, $rootScope, PlayerFactory, AlbumFactory) {

  $scope.showMe = true;

  $scope.$on('viewSwap', function (event, data) {
    $scope.showMe = (data.name === 'allAlbums');
  });

  // $scope.viewOneAlbum = function (album) {
  //   $rootScope.$broadcast('viewSwap', { name: 'oneAlbum', id: album._id });
  // };

  AlbumFactory.fetchAll()
  .then(albums => {
    $scope.albums = albums;
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound

});
