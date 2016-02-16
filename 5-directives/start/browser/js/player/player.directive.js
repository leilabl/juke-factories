'use strict';

juke.directive('player', function (PlayerFactory) {
	return {
		restrict: 'E',
		templateUrl: '/js/player/player.template.html',
		scope: {},
		link: function (scope) {
			angular.extend(scope, PlayerFactory);
			scope.toggle = function () {
				if ( PlayerFactory.isPlaying() ) PlayerFactory.pause();
    			else PlayerFactory.resume();
			};
			scope.getPercent = function () {
				return PlayerFactory.getProgress() * 100;
			};

		}
	}
})
