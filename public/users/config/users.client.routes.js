// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'example' module routes
angular.module('users').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/signin', {
			templateUrl: 'users/views/users.client.signin.html'
		}).
		when('/signup', {
			templateUrl: 'users/views/users.client.signup.html'
		}).
		when('/user/:userId', {
			templateUrl: 'users/views/users.client.accountInfo.html'
		});
	}
]); 
