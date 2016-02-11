'use strict';

juke.factory('PlayerFactory', function ($rootScope){
  // non-UI logic in here
  var currentSong;
  var playing = false;
  var songArr;
  var progress;


    // initialize audio player (note this kind of DOM stuff is odd for Angular)
  var audio = document.createElement('audio');


  audio.addEventListener('timeupdate', function () {
		    progress = audio.currentTime / audio.duration; 
		    $rootScope.$digest(); // no Angular-aware code is doing this for us here
		  }); 


  var playerFactory = {

  	start: function (song, songList){
    // stop existing audio (e.g. other song) in any case
    	songArr = songList;
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
			//this.start(currentSong);
			return false;
		} else {
			// this.pause();
			return true;
		}
	},

	getCurrentSong: function () {
		if (currentSong) return currentSong;
		return null;
	},

	next: function () {
		
		var nextSongIdx = songArr.indexOf(currentSong) + 1;
		var nextSong = songArr[nextSongIdx];

		if(songArr.indexOf(currentSong) == songArr.length-1) {
			nextSong = songArr[0];
		}
		playerFactory.start(nextSong, songArr);
	},

	previous: function () {
		var prevSongIdx = songArr.indexOf(currentSong) - 1;
		var prevSong = songArr[prevSongIdx];

		if(songArr.indexOf(currentSong) == 0) {
			prevSong = songArr[songArr.length-1];
		}
		playerFactory.start(prevSong, songArr);

	},

	getProgress: function() { 
		if(!playing) return 0; 
		return progress;
			// audio.addEventListener('ended', this.next());		    
	}

  	
  };
  return playerFactory;
});


