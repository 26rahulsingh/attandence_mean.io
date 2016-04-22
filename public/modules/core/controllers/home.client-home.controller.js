'use strict';

angular.module('core').controller('homeController',['$scope', '$http', '$rootScope', '$location', function($scope, $http, $rootScope, $location) {
        
         //$scope.isActive = false;

        $.getJSON('http://ipinfo.io', function(data){
            $scope.$apply(function() {
                $scope.userInfo = data;
            })
          console.log($scope.userInfo);
        });

        //To get client web browser details
        $(document).ready( function() {
                getBrowserDetails();
            });
        function getBrowserDetails() {
            $scope.browserName = navigator.userAgent;
            console.log($scope.browserName);
        };


        $scope.punchIn = function() {
            $scope.empInfo = {userid:$rootScope.empData._id, ipaddress: $rootScope.userIP};
            $http.post('/punchin', $scope.empInfo).then(function() {
                console.log('punchin successfully');
                console.log($scope.empInfo);
            }, function(err) {
                console.log('error');
            });
            $rootScope.isActive = true;
        }

        $scope.punchOut = function() {

            var date = new Date();
            var time = date.getHours();
            var minute = date.getMinutes();
            // $scope.empInfo = {userid:$rootScope.empData.id, date: date, timeout: time + ':' + minute};
            $scope.empInfo = {userid:$rootScope.empData._id};
            console.log($scope.empInfo);

            $http.put('/punchin', $scope.empInfo).then(function() {
                console.log('punchout successfully');
            }, function(err) {
                console.log('error');
            });

            // $scope.isDisabled = false;
            $rootScope.isActive = false;
        }


        $scope.home = function() {
            $location.path('/home');
        }

        $scope.logout = function() {
            console.log('successfully logout');
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