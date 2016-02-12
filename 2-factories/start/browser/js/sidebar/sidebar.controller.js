'use strict';

juke.controller('SidebarCtrl', function($scope, $http, $rootScope, $log, $q) {

	$scope.viewAlbums = function () {
		$rootScope.$broadcast('showAlbums');
	}
})