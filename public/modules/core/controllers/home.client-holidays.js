'use strict';

angular.module('core').controller('holidaysController',['$scope', '$http', '$location', '$localStorage', function($scope, $http, $location, $localStorage) {

    Sortable.init();
    $scope.localData = [];

    $scope.tmpHomeData = $localStorage.save;

    $http.get('/holiday').then(function(response) {
        $scope.getHolidays = response.data;
        console.log($scope.getHolidays);

        for (var i = $scope.getHolidays.length - 1; i >= 0; i--) {
            $scope.d = moment($scope.getHolidays[i].date);
            $scope.day = $scope.getHolidays[i].day;
            $scope.name = $scope.getHolidays[i].holidayname;
            $scope.tmpData = {date: $scope.d._d, day: $scope.day,holidayname: $scope.name};

            //$scope.holidayDate = moment($scope.d);
            console.log($scope.d);
            $scope.localData.unshift($scope.tmpData);
            console.log($scope.localData);
        }
    }, function(err) {
        console.log(err);
    });



    $scope.home = function() {
        $location.path('/home');
    }

    $scope.logout = function() {
        console.log('successfully logout');
        $localStorage.$reset();
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
