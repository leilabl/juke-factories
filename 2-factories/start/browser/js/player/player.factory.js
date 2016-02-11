'use strict';

juke.factory('PlayerFactory', function ($http, $log){
  // non-UI logic in here
  var currentSong;
  var playing = false;
  var nextSong, prevSong;

  var currAlbum;
  var album = {};

    // initialize audio player (note this kind of DOM stuff is odd for Angular)
  var audio = document.createElement('audio');
  // audio.addEventListener('ended', $scope.next);
  // audio.addEventListener('timeupdate', function () {
  //   $scope.progress = 100 * audio.currentTime / audio.duration;
  //   $scope.$digest(); // no Angular-aware code is doing this for us here
  // });

  // load our initial data
  $http.get('/api/albums/')
  .then(res => $http.get('/api/albums/' + res.data[0]._id)) // temp: use first
  .then(res =>res.data)
  .then(album => {
  	// console.log(album)
    album.imageUrl = '/api/albums/' + album._id + '.image';
    album.songs.forEach(function (song, i) {
      song.audioUrl = '/api/songs/' + song._id + '.audio';
      song.songIndex = i;
    });
    currAlbum = album;
    // StatsFactory.totalTime(album)
  })

  .catch($log.error); // $log service can be turned on and off; also, pre-bound

   function mod (num, m) { return ((num % m) + m) % m; };





  return {

  	start: function (song, songList){
    // stop existing audio (e.g. other song) in any case
	    this.pause();
	    playing = true;
	    if (song === currentSong) return audio.play();
	    // enable loading new song
	    currentSong = song;
	    audio.src = song.audioUrl;
	    audio.load();
	    audio.play();

	 },

	pause: function () {
	    audio.pause();
	    playing = false;
	},

	resume: function (song) {
		// resume current song
	    if (song === currentSong) return audio.play();
	},

	isPlaying: function () {
		if (!playing) {
			this.start(currentSong);
			return false;
		} else {
			this.pause();
			return true;
		}
	},

	getCurrentSong: function () {
		// console.log(currentSong)
		if (currentSong) return currentSong;
		return null;
	},
	// },

	skip: function (interval) {
		// console.log(currAlbum)
		if (!currentSong) return;
    var index = currentSong.songIndex;
    index = mod( (index + (interval || 1)), currAlbum.songs.length );
    currentSong = currAlbum.songs[index];
    if (playing) this.start(currentSong);
	},

	next: function () {
		this.skip(1);
	},

	previous: function () {
		this.skip(-1);

	}


  	
  };
});


