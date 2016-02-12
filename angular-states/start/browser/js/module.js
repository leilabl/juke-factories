'use strict';

var juke = angular.module('juke', ['ui.router'])
.config(function ($locationProvider) {
	$locationProvider.html5Mode(true);
})