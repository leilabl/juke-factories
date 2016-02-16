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


juke.directive('songList', function(PlayerFactory){
  return {
    restrict: 'E',
    templateUrl: '/js/song/songlist.template.html',
    scope: {
      songs: '=' //isolate scope - can be used anywhere - outside world needs to pass it something
    },
    link: function (scope) {
      angular.extend(scope, PlayerFactory);
      scope.toggle = function (song) {
        if (song !== PlayerFactory.getCurrentSong()) {
          PlayerFactory.start(song, scope.songs);
        } else if ( PlayerFactory.isPlaying() ) {
          PlayerFactory.pause();
        } else {
          PlayerFactory.resume();
        }
      }
      scope.isPlaying = function (song) {
        return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
      };
    }
  }
})

juke.directive('doubleClick', function () {
  return {
    restrict: 'A',
    scope: {
      doubleClick: '&' //from the outer scope it captures that expression - start(song)
      //doubleclick doesn't care what expression is being passed - the expression depends on the parent scope
    },
    link: function (scope, element) {
      element.on('dblclick', function () {
        scope.doubleClick()
    })
    }
  }
})
