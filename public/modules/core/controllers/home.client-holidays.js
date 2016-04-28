'use strict';

angular.module('core').controller('holidaysController',['$scope', '$http', '$location', '$localStorage', function($scope, $http, $location, $localStorage) {

    Sortable.init();

    $scope.tmpHomeData = $localStorage.save;

    $http.get('/holiday').then(function(response) {
        $scope.getHolidays = response.data;
        console.log($scope.getHolidays);
    }, function(err) {
        console.log(err);
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
