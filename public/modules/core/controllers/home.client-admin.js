'use strict';

angular.module('core').controller('adminController',['$scope', 'multipartForm', '$location', '$http', '$rootScope', function($scope, multipartForm, $location, $http, $rootScope) {

        $scope.holiday = {};
        
        $scope.Submit = function() {
            var uploadUrl = 'http://192.168.1.6:3000/upload';
            multipartForm.post(uploadUrl, $scope.holiday);
            console.log($scope.holiday);
        }

        $scope.logout = function() {
            $location.path('/login');
        }

        $scope.tmpData = $rootScope.adminData;
        console.log($scope.tmpData);
        $scope.selectedEmpAccount = '';

        $scope.selectedEmpChanged = function() {

            $scope.showEmpData = $scope.selectedEmpAccount;
            console.log($scope.showEmpData._id);

            Sortable.init();
            $scope.showTable = true;

            $rootScope.employeeData = {userid: $scope.showEmpData._id};
            console.log($rootScope.employeeData);

            $http.post('http://192.168.1.6:3000/getalldata', $rootScope.employeeData).then(function(response) {
                $scope.getAttandence = response.data.result1;
                console.log($scope.getAttandence);
                $scope.getStatus = response.data.result2;
                console.log($scope.getStatus);
            }, function(err) {
                console.log('error');
            });


            $http.post('http://192.168.1.6:3000/leavedata', $rootScope.employeeData).then(function(response) {
                $scope.getLeave = response.data.result;
                console.log($scope.getLeave);
            }, function(err) {
                console.log('error');
            });

        }


        $scope.submitDate = function(leaveIdx) {

            $scope.idforLeave = $rootScope.employeeData.userid;
            $scope.leaveDate = $scope.getLeave[leaveIdx].date.slice(0, 10);
            console.log($scope.idforLeave);
            console.log($scope.leaveDate);

            $scope.grantLeaveDate = {userid: $scope.idforLeave, d: $scope.leaveDate};
            console.log('grant leave', $scope.grantLeaveDate);

            $http.post('http://192.168.1.6:3000/employeleaveupdate', $scope.grantLeaveDate).then(function(response) {
                $scope.message = response.data;
                console.log($scope.message);
                $scope.getLeave.splice(leaveIdx, 1);
            }, function(err) {
                console.log('error');
            });
        }

}]);