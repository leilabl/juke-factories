'use strict';

var juke = angular.module('juke', ['ui.router'])
.config(function ($locationProvider, $urlRouterProvider) {
	$locationProvider.html5Mode(true);

	$urlRouterProvider.when('/', '/albums');
})