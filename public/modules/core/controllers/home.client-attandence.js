'use strict';

angular.module('core').controller('attandenceController',['$scope', '$http', '$location', '$localStorage', function($scope, $http, $location, $localStorage) {

    Sortable.init();

    $scope.tmpHomeData = $localStorage.save;

    $scope.attandenceData = {userid: $scope.tmpHomeData.id};

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
