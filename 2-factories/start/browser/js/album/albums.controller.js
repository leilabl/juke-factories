'use strict';

juke.controller('AlbumsCtrl', function($scope, $http, $rootScope, $log, $q) {
	$http.get('/api/albums/')
	.then(function (res) {
		var albumUrls = [];
		res.data.forEach(function(album) {
			albumUrls.push($http.get('/api/albums/' + album._id))
		})
		return $q.all(albumUrls);
	})
	.then(function (res) {
		$scope.albums = [];
		res.forEach(function(album) {
			$scope.albums.push({
				imageUrl: '/api/albums/' + album.data._id + '.image',
				name: album.data.name,
				numSongs: album.data.songs.length
			});
		});
		return $scope.albums;
	})
	.catch($log.error);

	$scope.$on('showAlbums', function () {
		$scope.showMe = true;
	});

});


