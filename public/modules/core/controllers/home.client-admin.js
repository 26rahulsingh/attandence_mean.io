'use strict';

angular.module('core').controller('adminController',['$scope', 'multipartForm', '$location', '$http', '$localStorage', function($scope, multipartForm, $location, $http, $localStorage) {

        $scope.holiday = {};
        
        $scope.Submit = function() {
            var uploadUrl = '/holiday';
            multipartForm.post(uploadUrl, $scope.holiday);
            console.log($scope.holiday);
        }

        $scope.logout = function() {
            $location.path('/login');
        }


        // $scope.expData = [{'_id':"null", 'username':"none"}];
        // $scope.tmpData = $scope.expData.concat($rootScope.empData.result);
        $scope.tmpHomeData = $localStorage.save;
        console.log($scope.tmpHomeData);
        $scope.tmpData = $localStorage.save.result;
        //$scope.tmpData = $rootScope.empData.result;
        console.log($scope.tmpData);
        $scope.selectedEmpAccount = '';

        $scope.selectedEmpChanged = function() {

            $scope.showEmpData = $scope.selectedEmpAccount;
            console.log($scope.showEmpData._id);

            Sortable.init();
            $scope.showTable = true;

            $scope.employeeData = {userid: $scope.showEmpData._id};
            console.log($scope.employeeData);

            $http.post('/getattendence', $scope.employeeData).then(function(response) {
                $scope.getAttandence = response.data.result1;
                console.log($scope.getAttandence);
                $scope.getStatus = response.data.result2;
                console.log($scope.getStatus);
            }, function(err) {
                $scope.showTable = false;
                console.log('error');
            });


            $http.put('/getattendence', $scope.employeeData).then(function(response) {
                $scope.getLeave = response.data.result;
                console.log($scope.getLeave);
            }, function(err) {
                console.log('error');
            });

        }


        $scope.submitDate = function(leaveIdx) {

            $scope.idforLeave = $scope.employeeData.userid;
            console.log($scope.idforLeave);
            $scope.leaveDate = $scope.getLeave[leaveIdx].date.slice(0, 10);
            console.log($scope.leaveDate);

            $scope.grantLeaveDate = {userid: $scope.idforLeave, d: $scope.leaveDate};
            console.log('grant leave', $scope.grantLeaveDate);

            $http.put('/leave', $scope.grantLeaveDate).then(function(response) {
                $scope.message = response.data;
                console.log($scope.message);
                $scope.getLeave.splice(leaveIdx, 1);
            }, function(err) {
                console.log('error');
            });
        }

}]);