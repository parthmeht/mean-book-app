// Invoke 'strict' JavaScript mode
'use strict';

angular.module('users').controller('MyAccountController', ['$scope', 'Authentication', '$http',
	function($scope, Authentication, $http) {
		// Get the user's 'fullName' 
		$scope.authentication = Authentication;
	}
]);
