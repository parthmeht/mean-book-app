// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'Authentication' service
angular.module('menu').factory('Items', [ '$resource',
function($resource) {
    return $resource('api/menu/items/:itemId', {
        itemId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);