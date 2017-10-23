// Invoke 'strict' JavaScript mode
'use strict';

angular.module('users').controller('MyAccountController', ['$scope', 'Authentication','UserServices', '$rootScope', '$log', '$uibModal', 'modalFactory',
	function($scope, Authentication, UserServices, $rootScope, $log, $uibModal, modalFactory) {
		$scope.authentication = Authentication;
		$scope.isNavCollapsed = true;
		$scope.loadData = function(){
			$scope.showUserAcess = false;
			if($scope.authentication.user){
				UserServices.getUserIdList().then(function success(response) {
					$scope.userList =  response.data;
					console.log($scope.userList);
				}, function failure(response) {
					$scope.userList =  response.statusText;
				});
			}
		}

		$scope.selectedUserFunc = function(){
			if($scope.selectedUser.userId != $scope.authentication.user.userId){
				$scope.showUserAcess = true;
			}else{
				$scope.message = "You cannot set access controls for yourself !!!"; 
				modalFactory.open('md', 'myModalContent.html', {message: $scope.message,title:"Error"}).result.then(function(parameter) {
					console.log(parameter);
					$scope.message = parameter;
				});
			}
		}

		$scope.changeUserRoleFunc = function(){
			UserServices.changeUserRole($scope.selectedUser).then(function success(response) {
				console.log(response.data.message);
				modalFactory.open('md', 'myModalContent.html', {message: response.data.message,title:"Success"}).result.then(function(parameter) {
					console.log(parameter);
					$scope.showUserAcess = false;
				});
			}, function failure(response) {
				console.log(response.statusText);
			});
		}
	  
	}
]);

angular.module('users').factory('modalFactory', function($uibModal) {
  return {
	open: function(size, template, params) {
	  return $uibModal.open({
		animation: true,
		templateUrl: template || 'myModalContent.html',
		controller: 'ModalResultInstanceCtrl',
		size: size,
		resolve: {
		  params: function() {
			return params;
		  }
		}
	  });
	}
  };
});

angular.module('users').controller('ModalResultInstanceCtrl', function($scope, $uibModalInstance, params) {
	$scope.modal = {};
	$scope.modal.message = params.message;
	$scope.modal.title = params.title;

	$scope.ok = function() {
		$uibModalInstance.close($scope.message);
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});