'use strict';

angular.module('core').controller('attandenceController',['$scope', '$http', '$location', '$localStorage', '$filter', function($scope, $http, $location, $localStorage, $filter) {

    Sortable.init();

    $scope.tmpHomeData = $localStorage.save;

    $scope.eventSources = [];

    $scope.sendDate = $filter('date')(new Date(), "yyyy-MM-dd");
    console.log('calendar date', $scope.sendDate);

    $scope.attandenceData = {userid: $scope.tmpHomeData.id, date: $scope.sendDate};


    // $scope.json=[{title:'event1',date:'2016-04-22'}];
    // console.log($scope.json);

    $scope.alertOnRender = function (date, cell) {
        var tmpDate = date.format();
        // console.log('Render', date);
        // console.log('Render Cell', cell);
        //console.log('past date', $(cell).data('date'));


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



    // $('body').on('click', 'button.fc-next-button', function(view) {
    //     alert('The new title of the view is ' + view.title);
    //     console.log(view.title);
    // });

    // $('.fc-button-prev span').click(function(){
    //      var date1 = $('#calendar').fullCalendar('prev').fullCalendar( 'getDate' );
    //      alert('prev ' + date1.getMonth());
    //      return false;
    // });

    // $('body').on('click', 'button.fc-button-prev', function() {
    //     var date1 = $('#calendar').fullCalendar('prev').fullCalendar( 'getDate' );
    //     alert('prev ' + date1.getMonth());
    //     console.log('prev ', date1);
    //     return false;
    // });


    // $('body').on('click', 'button.fc-prev-button', function() {
    //     viewRender: function(view, element) {
    //         console.log("The view's title is " + view.intervalStart.format());
    //         console.log("The view's title is " + view.name);
    //     }
    // });




    

    // $("#calendar").fullCalendar({
    //     viewRender: function(view, element) {
    //         console.log("The view's title is " + view.intervalStart.format());
    //         console.log("The view's title is " + view.name);
    //     }
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
