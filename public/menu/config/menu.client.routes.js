// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'example' module routes
angular.module('menu').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/menu/item', {
      templateUrl: 'menu/views/list-item.client.view.html'
    }).
    when('/menu/item/create', {
      templateUrl: 'menu/views/create-item.client.view.html'
    }).
    when('/menu/item/:itemId/edit', {
      templateUrl: 'menu/views/create-item.client.view.html'
    });
  }
]);