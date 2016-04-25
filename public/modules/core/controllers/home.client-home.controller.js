'use strict';

angular.module('core').controller('homeController',['$scope', '$http', '$rootScope', '$location', '$localStorage', function($scope, $http, $rootScope, $location, $localStorage) {
        
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


        $scope.tmpHomeData = $localStorage.save;
        console.log($scope.tmpHomeData);
        $scope.tmpIP = $localStorage.userIP;
        console.log($scope.tmpIP);


        // $('.enableOnPunchin').attr("disabled", false);
        // $('.enableOnPunchout').attr('disabled', true);


        $scope.punchIn = function() {
            $scope.empInfo = {userid:$scope.tmpHomeData.id, ipaddress: $scope.tmpIP};
            $http.post('/punchin', $scope.empInfo).then(function() {
                console.log('punchin successfully');
                console.log($scope.empInfo);
            }, function(err) {
                console.log('error');
            });

            $rootScope.isActive = true;
            // $localStorage.btn = true;
            //$scope.isActive = $localStorage.btn;
            //$('.enableOnPunchin').attr('disabled', false);
            
            // $('.enableOnPunchin').attr("disabled", true);
            // $('.enableOnPunchout').attr('disabled', false);
        }
        

        $scope.punchOut = function() {

            var date = new Date();
            var time = date.getHours();
            var minute = date.getMinutes();
            // $scope.empInfo = {userid:$rootScope.empData.id, date: date, timeout: time + ':' + minute};
            $scope.empInfo = {userid:$scope.tmpHomeData.id};
            console.log($scope.empInfo);

            $http.put('/punchin', $scope.empInfo).then(function() {
                console.log('punchout successfully');
            }, function(err) {
                console.log('error');
            });

            $rootScope.isActive = false;
            //$scope.isDisabled = false;
            // $localStorage.btn1 = true;
            //$scope.isActive = $localStorage.btn1;
            //$('.enableOnPunchin').prop('disabled', false);
            // $('.enableOnPunchin').removeAttr('disabled');
            // $('.enableOnPunchout').attr('disabled', true);
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