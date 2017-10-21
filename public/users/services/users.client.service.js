// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'Authentication' service
angular.module('users').factory('UserServices', [ '$http',
function($http) {

    var UserService = {};

    UserService.getUserIdList = function() {
        var url = "/api/userIdList";
        return $http.get(url);
    }

    UserService.changeUserRole = function(data) {
        var url = "/api/changeUserRole";
        return $http.post(url,data);
    }

    return UserService;

}]);