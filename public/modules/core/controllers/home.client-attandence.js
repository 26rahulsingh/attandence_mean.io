'use strict';

angular.module('core').controller('attandenceController',['$scope', '$http', '$location', '$localStorage', '$filter', function($scope, $http, $location, $localStorage, $filter) {

    Sortable.init();

    $scope.tmpHomeData = $localStorage.save;

    $scope.eventSources = [];

    $scope.attandenceData = {userid: $scope.tmpHomeData.id};


    // $scope.json=[{title:'event1',date:'2016-04-22'}];
    // console.log($scope.json);

    $scope.alertOnRender = function (date, cell) {
        var tmpDate = date.format();


        $http.post('/getattendence', $scope.attandenceData).then(function(response) {
            $scope.getAttandence = response.data.result1;
            console.log($scope.getAttandence);
            $scope.getStatus = response.data.result2;
            console.log($scope.getStatus);

            $scope.tmpData = $scope.getAttandence.concat($scope.getStatus);
            console.log('added two json',$scope.tmpData);


            // $scope.getAttandence.forEach(function(item, index){
            //     console.log(item);
            // })

             // for (var i = 0; i < $scope.getAttandence.length - 1; i++) {
             //     console.log(tmpDate);
             //     console.log($scope.getAttandence[i].date);
             //     var d = $filter('date')($scope.getAttandence[i].date, "yyyy-MM-dd");
             //     console.log('new date', d);
             //     if (d == tmpDate) {
             //         cell.css('background-color', 'green');
             //     }
             // };

            for (var i = $scope.tmpData.length - 1; i >= 0; i--) {
                var d = $filter('date')($scope.tmpData[i].date, "yyyy-MM-dd");
                console.log('new date', d);
                if (d == tmpDate && $scope.tmpData[i].status == 'Present') {
                    cell.css('background-color', '#59ae42');
                }
                else if (d == tmpDate && $scope.tmpData[i].status == 'Absent') {
                    cell.css('background-color', '#ff4d4d');
                }
            }
        }, function(err) {
            console.log('error');
        });

        
    }



    $('body').on('click', 'button.fc-next-button', function() {
        //do something
        alert('hi');
        self.calendarAvailable.fullCalendar('gotoDate', '2016-05-20');

    });


    $('body').on('click', 'button.fc-prev-button', function() {
        //do something
        alert('hi');
        self.calendarAvailable.fullCalendar('gotoDate', '2016-03-20');

    });

    // $('.fc-next-button').click(function() {
    //     $('#calendar').fullCalendar('next');
    //     alert('hi');
    //     self.calendarAvailable.fullCalendar('gotoDate', '2016-05-20');
    // });





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
            eventResize: $scope.alertOnResize,
            dayRender: $scope.alertOnRender
          }
        };


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
