var ourAngularApp = angular.module('murray', []);

ourAngularApp.controller('TopCtrl', function ($scope) {
	$scope.name = 'Nimit';
});

ourAngularApp.controller('ProductsCtrl', function ($scope, CartFactory, ProductFactory) {
	ProductFactory.fetchAll()
	.then(function (products) {
		$scope.products = products;
	});
	$scope.addToCart = function (item) {
		CartFactory.add(item);
	};
});

ourAngularApp.factory('ProductFactory', function ($http) {
	return {
		fetchAll: function () {
			var promiseForResponseData =
			$http.get('/pictures')
			.then(function (response) {
				return response.data;
			});
			return promiseForResponseData;
		}
	}
});

ourAngularApp.factory('CartFactory', function ($http) {
	var cart = [];
	$http.get('/cart')
	.then(function (response) {
		cart = response.data;
	});
	return {
		get: function () {
			return cart;
		},
		add: function (thing) {
			$http.post('/cart', thing)
			.then(function () {
				cart.push(thing);
			});
		}
	}
});

ourAngularApp.directive('controlArea', function (CartFactory) {
	return {
		restrict: 'E',
		templateUrl: '/control-area.html',
		scope: {
			nameOfUser: '='
		},
		link: function (scope, element, attributes) {
			element.on('mouseover', function () {
				console.log('this fires');
				scope.adjective = 'Anxious';
				scope.$digest();
			});
			scope.somethingElse = 'a string with words';
			scope.adjective = 'Happy';
			scope.loadCart = CartFactory.get;
			scope.total = function () {
				return scope.loadCart().reduce(function (sum, item) {
					return sum + item.price;
				}, 0);
			};
		}
	};
});

ourAngularApp.directive('pic', function () {
	return {
		restrict: 'E',
		templateUrl: '/pic.html',
		scope: {
			data: '='
		}
	};
});