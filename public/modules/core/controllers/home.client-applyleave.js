'use strict';

angular.module('core').controller('leaveController',['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location) {

    // console.log('in leave');
    // $scope.$watch('myDate',function(oldvalue,newValue){
    // console.log('myDate',$scope.myDate);
    // });
     $scope.eventSources = [];
    // $scope.tmpDate = [];
    //$scope.isShow = true;

    
    $scope.alertEventOnClick = function(date, jsEvent, view) {
        //alert('Clicked on: ' + date.format());
        $rootScope.mydate = date.format();
        $rootScope.click = $(this).css('background-color', 'gray');
        console.log($rootScope.mydate);
    };

    // $scope.applyLeave = function() {
    //     $scope.click = $($rootScope.click).css('background-color', '#ff4d4d');

    //     $scope.leaveData = {userid: $rootScope.empData.id, date: $rootScope.mydate, leavetype: "CL"};
    //     console.log($scope.leaveData);

    //     $http.post('http://192.168.1.6:3000/applyleave', $scope.leaveData).then(function() {
    //         console.log('leave applied successfully');
    //     }, function(err) {
    //         console.log('error');
    //     });
    // };


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