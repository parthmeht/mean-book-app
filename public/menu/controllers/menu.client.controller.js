// Invoke 'strict' JavaScript mode
'use strict';

angular.module('menu').controller('MenuController', ['$scope', 'Authentication','Items', '$rootScope', '$log', '$uibModal', 'modalFactory','$routeParams','$location',
	function($scope, Authentication, Items, $rootScope, $log, $uibModal, modalFactory,$routeParams,$location) {
		$scope.authentication = Authentication;
        $scope.categoryList = [
            {id:1,name:'Soup'},
            {id:2,name:'Main Course'},
            {id:3,name:'Rice'},
            {id:4,name:'Siders'},
            {id:5,name:'Sweets'}
        ];
        $scope.item = new Items();

        $scope.submitMenuItemFunc = function(){
            console.log($scope.item);      

            if($routeParams.itemId){
                $scope.item._id = $scope.item.itemId;
                $scope.item.$update(function() {
                    modalFactory.open('md', 'menuModalContent.html', {message: 'Item Updated successfully !!!',title:"Success"}).result.then(function(parameter) {
                        console.log(parameter);
                        $location.path('menu/item');
                    });
                }, function(errorResponse) {
                    $scope.error = errorResponse.data.message;
                    modalFactory.open('md', 'menuModalContent.html', {message: $scope.error,title:"Error"}).result.then(function(parameter) {
                        console.log(parameter);
                        $location.path('menu/item');
                    });
                });
            }else{
                $scope.item.$save(function(response) {
                    $scope.item = new Items();
                    modalFactory.open('md', 'menuModalContent.html', {message: 'Item added successfully !!!',title:"Success"}).result.then(function(parameter) {
                        console.log(parameter);
                    });
                }, function(errorResponse) {
                    $scope.error = errorResponse.data.message;
                    $scope.item = new Items();
                    modalFactory.open('md', 'menuModalContent.html', {message: $scope.error,title:"Error"}).result.then(function(parameter) {
                        console.log(parameter);
                    });
                });
            }
        };

        $scope.loadItemListFunc = function(){
            $scope.items = Items.query();
        };

        $scope.findItem = function() {
            if($routeParams.itemId){
                $scope.item = Items.get({
                    itemId: $routeParams.itemId
                });
                console.log($scope.item);
            }
        };

        $scope.categoryDecode = function(id){
            var category;
            switch (id) {
                case 1: category = 'Soup'; break;
                case 2: category = 'Main Course'; break;
                case 3: category = 'Rice'; break;
                case 4: category = 'Siders'; break;
                case 5: category = 'Sweets'; break;
                default:  category = 'No Category'; break;   
    
            }
            return category;
        };

        $scope.confirmModal = function(item){
            var obj = {
                message: "Are you sure you want to delete the item ?",
                title: "Information",
                item: item,
                okLabel: "Yes",
                cancelLabel: "No"
            };
            modalFactory.open('md', 'viewItemModalContent.html', obj).result.then(function(parameter) {
                console.log(parameter);
                $scope.delete(parameter.item);
            });
        }

        $scope.delete = function(item) {
            if (item) {
                item.$remove(function() {
                    modalFactory.open('md', 'viewItemModalContent.html', {message: 'Item deleted successfully !!!',title:"Success"}).result.then(function(parameter) {
                        for (var i in $scope.items) {
                            if ($scope.items[i] === item) {
                                $scope.items.splice(i, 1);
                            }
                        }
                    });                   
                });
            } else {
              $scope.item.$remove(function() {
                modalFactory.open('md', 'viewItemModalContent.html', {message: 'Item deleted successfully !!!',title:"Success"}).result.then(function(parameter) {
                    console.log(parameter);
                    $scope.loadItemListFunc();
				});
              });
            }
        };
	  
	}
]);
