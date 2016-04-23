'use strict';

angular.module('core').controller('attandenceController',['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location) {

    Sortable.init();

    $scope.attandenceData = {userid: $rootScope.empData.id};

    $http.post('/getattendence', $scope.attandenceData).then(function(response) {
        $scope.getAttandence = response.data.result1;
        console.log($scope.getAttandence);
        $scope.getStatus = response.data.result2;
        console.log($scope.getStatus);
    }, function(err) {
        console.log('error');
    });


    $scope.home = function() {
        $location.path('/home');
    }

    $scope.logout = function() {
        $location.path('/login');
    }

    $scope.leave = function() {
        $location.path('/applyleave');
    }

    $scope.attandence = function() {
        $location.path('/attandence');
    }

    $scope.holidays = function() {
        $location.path('/holidays');
    }


}]);
