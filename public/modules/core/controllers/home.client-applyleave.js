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
        //console.log('day', date._d.getDay());

        if ($scope.mydate > $scope.todayDate && date._d.getDay() != 0) {
            
            $scope.click = $(this).css('background-color', 'gray');
            console.log($scope.mydate);
            console.log($scope.click);
        }
    };



    $('#calendar').fullCalendar({
          editable: true,
          eventSources: [
            {
              events: [  
                {
                  title     : 'event1',
                  start     : '2016-04-10'
                }
              ],
              backgroundColor: 'green',
              borderColor: 'green',
              textColor: 'yellow'
            },[
              {
                title  : 'event2',
                start  : '2012-06-05',
                end    : '2012-06-07'
              },
              {
                title  : 'event3',
                start  : '2012-06-09 12:30:00',
                allDay : false
              }
            ]
          ],
          eventDrop: function(event, delta) {
            alert(event.title + ' was moved ' + delta + ' days\n' + '(should probably update your database)');
          },
          loading: function(bool) {
            //if (bool) $('#loading').show();
            //else $('#loading').hide();
          }
        });



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
            else if($scope.getMsg.msg == "succesfully leave apply"){
                $scope.click = $($scope.click).css('background-color', '#ff4d4d');
            }
        }, function(err) {
            console.log('error');
        });

    };


    var date2 =new Date();
    function format(date) {

      date2 = new Date(date);
      var day = ('0' + date2.getDate()).slice(-2);
      var month = ('0' + (date2.getMonth() + 1)).slice(-2);
      var year = date2.getFullYear();

      return year + '-' + month + '-' + day;
    }
    console.log(format(date2));
    $scope.todayDate=format(date2);

    
    // $scope.json=[{title:'event1',date:'2016-04-28'}];
    // console.log($scope.json.date);

    $scope.alertOnRender = function (date, cell) {
        var tmpDate = date.format();


        // if ($scope.json[0].date==tmpDate) {
        //     cell.css("background-color","red");
        //     console.log('event');
        // }
        if (tmpDate < $scope.todayDate) {
            //console.log("Entered date is greater than today's date ",tmpDate);

            $('.fc-day-number.fc-past').css('opacity', '0.3');
            //cell.css('opacity', '0.6');
        }
        else {
            $('.fc-day-number.fc-sun').css('opacity', '0.3');
            //console.log("Entered date is less than today's date ");
        }

    }


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