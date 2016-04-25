'use strict';

angular.module('core').controller('leaveController',['$scope', '$http', '$location', '$localStorage', function($scope, $http, $location, $localStorage) {

    // console.log('in leave');
    // $scope.$watch('myDate',function(oldvalue,newValue){
    // console.log('myDate',$scope.myDate);
    // });
    $scope.eventSources = [];
    // $scope.tmpDate = [];
    //$scope.isShow = true;
    $scope.tmpHomeData = $localStorage.save;

    
    $scope.alertEventOnClick = function(date, jsEvent, view) {
        //alert('Clicked on: ' + date.format());
        $scope.mydate = date.format();
        $scope.click = $(this).css('background-color', 'gray');
        console.log($scope.mydate);
    };

    $scope.applyLeave = function() {

        $scope.leaveData = {userid: $scope.tmpHomeData.id, date: $scope.mydate, leavetype: "CL"};
        console.log($scope.leaveData);

        $http.post('/leave', $scope.leaveData).then(function(response) {
            // console.log('leave applied successfully');
            $scope.getMsg = response.data;
            console.log($scope.getMsg);
            if ($scope.getMsg.msg == "CL exceded") {
                $scope.click = $($scope.click).css('background-color', 'transparent');
                alert("CL exceded can not apply for leave");
            } 
            else if(response.data == ""){
                $scope.click = $($scope.click).css('background-color', '#ff4d4d');
            }
        }, function(err) {
            console.log('error');
        });

    };


    /* config object */
        $scope.uiConfig = {
          calendar:{
            height: 440,
            editable: true,
            weekends: true,
            forceEventDuration: true,
            header:{
              //left: 'month basicWeek basicDay agendaWeek agendaDay',
              //center: 'title',
              right: 'today prev,next'
            },
            dayClick: $scope.alertEventOnClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize
          }
        };

    $scope.addMore = function() {
        $scope.isShow = true;
    }

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