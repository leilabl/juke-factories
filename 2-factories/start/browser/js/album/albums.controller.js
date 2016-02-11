'use strict';

juke.controller('AlbumsCtrl', function($scope, $http, $rootScope, $log, $q, StatsFactory, PlayerFactory) {

	  // load our initial data
  $http.get('/api/albums/')
  .then(function (res) {
  	// console.log(res.data)
  	var albumUrls = [];
  	res.data.forEach(function(album) {
  		// console.log(album)
  		albumUrls.push($http.get('/api/albums/' + album._id))
  	})
  	return $q.all(albumUrls);
  })
.then(function (res) {
	$scope.albums = [];
	res.forEach(function(album) {
		$scope.albums.push(album.data);
	})
//get data from res
//foreach or map to attach image urls
//
//set scope.albums	

})


  // res => $http.get('/api/albums/' + res.data[4]._id)) // temp: use first
  // .then(res => res.data)
  // .then(album => {
  //   album.imageUrl = '/api/albums/' + album._id + '.image';
  //   album.songs.forEach(function (song, i) {
  //     song.audioUrl = '/api/songs/' + song._id + '.audio';
  //     song.albumIndex = i;
  //   });
  //   $scope.album = album;
  //   StatsFactory.totalTime(album)
  //   .then(function (albumDuration)  {
  //     $scope.fullDuration = albumDuration;
  //   })
  // })

  .catch($log.error); // $log service can be turned on and off; also, pre-bound


});


// $scope.cover =
// $scope.name =
// $scope.imageUrl =
// $scope.numberOfSongs =

