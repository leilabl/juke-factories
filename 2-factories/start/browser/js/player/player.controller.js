'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  // // initialize audio player (note this kind of DOM stuff is odd for Angular)
  // var audio = document.createElement('audio');
  // audio.addEventListener('ended', $scope.next);
  // audio.addEventListener('timeupdate', function () {
  //   $scope.progress = 100 * audio.currentTime / audio.duration;
  //   $scope.$digest(); // no Angular-aware code is doing this for us here
  // });

  // state
  // $scope.currentSong;
  // $scope.playing = false;

  // // main toggle
  // $scope.toggle = function (song) {
  //   if ($scope.playing) $rootScope.$broadcast('pause');
  //   else $rootScope.$broadcast('play', song);
  // };

  // incoming events (from Album or toggle)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);

  $scope.playing = PlayerFactory.isPlaying;
  $scope.play = PlayerFactory.start;
  $scope.pause = PlayerFactory.pause;
  $scope.resume = PlayerFactory.resume;
  $scope.next = PlayerFactory.next;
  $scope.previous = PlayerFactory.previous;
  $scope.currentSong = PlayerFactory.getCurrentSong
  $scope.getProgress = function () {
    return 100 * PlayerFactory.getProgress();
  }

    // main toggle
  $scope.toggle = function (song) {
    // console.log('song',song , 'current song', $scope.currentSong())
    if ($scope.playing() && song === $scope.currentSong()) {
        $scope.pause();
    } else $scope.play(song);
  };

  // $scope.$digest();


  // functionality
  // function pause () {
  //   audio.pause();
  //   $scope.playing = false;
  // }
  // function play (event, song){
  //   // stop existing audio (e.g. other song) in any case
  //   pause();
  //   $scope.playing = true;
  //   // resume current song
  //   if (song === $scope.currentSong) return audio.play();
  //   // enable loading new song
  //   $scope.currentSong = song;
  //   audio.src = song.audioUrl;
  //   audio.load();
  //   audio.play();
  // }

  // outgoing events (to Album… or potentially other characters)
  // $scope.next = function () { pause(); $rootScope.$broadcast('next'); };
  // $scope.prev = function () { pause(); $rootScope.$broadcast('prev'); };

});
