'use strict';

juke.controller('SongChooseCtrl', function ($scope, SongFactory) {

  $scope.songs = [];

  SongFactory.fetchAll()
  .then(function (songs) {
    $scope.songs = songs;
  });

  $scope.reset = function () {
    $scope.toAdd = null;
  };

  $scope.addIt = function () {
    $scope.addSong($scope.toAdd)
    .then(function () {
      $scope.reset();
    });
  };

});


juke.directive('songList', function(){
  return {
    restrict: 'E',
    templateUrl: '/js/song/songlist.template.html',
    scope: {
      songs: '='
    }
  }
})

// pass in functionality for play buttons (pass in controller function to directive?)
// link function that gives this directive's scope the functionality necessary to play songs
