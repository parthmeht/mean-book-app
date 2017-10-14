// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'example' controller
angular.module('users').controller('SignInController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// Get the user's 'fullName' 
		$scope.authentication = Authentication;
	}
]);

angular.module('users').controller('MyAccountController', ['$scope', 'Authentication', '$http',
	function($scope, Authentication, $http) {
		// Get the user's 'fullName' 
		$scope.authentication = Authentication;
	}
]);
