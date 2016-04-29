'use strict';

angular.module('core').controller('approveController',['$scope', '$location', '$http', '$localStorage', '$stateParams', function($scope, $location, $http, $localStorage, $stateParams) {

	 $scope.params = $stateParams.date;
	

}]);