'use strict';

angular.module('core').controller('homeController',['$scope', '$http', '$rootScope', '$location', '$localStorage', '$filter', function($scope, $http, $rootScope, $location, $localStorage, $filter) {
        

         $scope.tmpHomeData = $localStorage.save;
         console.log($scope.tmpHomeData);
         $scope.tmpIP = $localStorage.userIP;
         console.log($scope.tmpIP);


        $.getJSON('http://ipinfo.io', function(data){
            $scope.$apply(function() {
                $scope.userInfo = data;
            })
          console.log($scope.userInfo);
        });

        //To get client web browser details
        $(document).ready( function() {
                getBrowserDetails();
                chkButton();
            });
        function getBrowserDetails() {
            $scope.browserName = navigator.userAgent;
            console.log($scope.browserName);
        };


        // $('.enableOnPunchin').attr("disabled", false);
        // $('.enableOnPunchout').attr('disabled', true);

        // var d = $scope.tmpHomeData.date.slice(0, 10);
        // console.log(d);

        // var lasttimeout = $scope.tmpHomeData.lasttimeout;
        // console.log(lasttimeout);

        // var dd = $filter('date')(new Date(), "yyyy-MM-dd");
        // console.log(dd);

        // $(document).ready( function() {
        //     chkButton();
        // });
        


        $scope.punchIn = function() {
            $scope.empInfo = {userid:$scope.tmpHomeData.id, ipaddress: $scope.tmpIP};
            console.log($scope.empInfo);

            var chkData = $localStorage.chkPunchIn
            console.log(chkData);

                if ($scope.tmpActivity.length == 0) {
                    $http.post('/punchin', $scope.empInfo).then(function(response) {
                        console.log('punchin successfully');
                        console.log($scope.empInfo);

                        $scope.getHomeData = response.data;
                        console.log($scope.getHomeData);

                        $localStorage.newData = $scope.getHomeData;
                        $scope.getHome = $localStorage.newData;

                            if ($filter('date')(new Date(), "yyyy-MM-dd") == $scope.getHome.date.slice(0, 10) && $scope.getHome.lasttimeout == "false") {
                                $scope.isDisabled = true;
                                $scope.isActive = false;
                            }
                    }, function(err) {
                        console.log('error');
                    });
                }
                // else if ($filter('date')(new Date(), "yyyy-MM-dd") == chkData.date.slice(0, 10) && chkData.lasttimeout != null && $scope.tmpHomeData.id == $scope.empInfo.userid) {
                //     alert("Already Punched in for Today");
                // }
                else if ($filter('date')(new Date(), "yyyy-MM-dd") > chkData.date.slice(0, 10)){

                    console.log('new Date', $filter('date')(new Date(), "yyyy-MM-dd"));
                    console.log('old Date', chkData.date.slice(0, 10));
                    $http.post('/punchin', $scope.empInfo).then(function(response) {
                        console.log('punchin successfully');
                        console.log($scope.empInfo);

                        $scope.getHomeData = response.data;
                        console.log($scope.getHomeData);

                        $localStorage.newData = $scope.getHomeData;
                        $scope.getHome = $localStorage.newData;

                            if ($filter('date')(new Date(), "yyyy-MM-dd") == $scope.getHome.date.slice(0, 10) && $scope.getHome.lasttimeout == "false") {
                                $scope.isDisabled = true;
                                $scope.isActive = false;
                            }
                    }, function(err) {
                        console.log('error');
                    });
                }
                else if ($filter('date')(new Date(), "yyyy-MM-dd") == chkData.date.slice(0, 10) && chkData.lasttimeout == "false"){

                    $http.post('/punchin', $scope.empInfo).then(function(response) {
                        console.log('punchin successfully');
                        console.log($scope.empInfo);

                        $scope.getHomeData = response.data;
                        console.log($scope.getHomeData);

                        $localStorage.newData = $scope.getHomeData;
                        $scope.getHome = $localStorage.newData;

                            if ($filter('date')(new Date(), "yyyy-MM-dd") == $scope.getHome.date.slice(0, 10) && $scope.getHome.lasttimeout == "false") {
                                $scope.isDisabled = true;
                                $scope.isActive = false;
                            }
                    }, function(err) {
                        console.log('error');
                    });
                }
                
        }


        function chkButton() {

            $scope.lastAcitivityData = {userid:$scope.tmpHomeData.id};
            console.log($scope.lastAcitivityData);
            $http.post('/lastactivity', $scope.lastAcitivityData).then(function(response) {
                $scope.tmpActivity = response.data;
                console.log($scope.tmpActivity);
                $localStorage.newHomeData = $scope.tmpActivity;
                $scope.chkHomeData = $localStorage.newHomeData;
                console.log('New Data for new User', $scope.chkHomeData);
                if (response.data.length <= 0) {
                    console.log('if', response);
                    $scope.isDisabled = false;
                    $scope.isActive = true;
                }
                else {
                    $scope.exp = response.data;
                    console.log('exp',$scope.exp);
                    $localStorage.chkPunchIn = $scope.exp;
                    console.log($localStorage.chkPunchIn);
                    

                    if ($filter('date')(new Date(), "yyyy-MM-dd") == $scope.exp.date.slice(0, 10) && $scope.exp.lasttimeout == "false") {
                        $scope.isDisabled = true;
                        $scope.isActive = false;
                        console.log('for punchOut');
                    }
                    else if (($filter('date')(new Date(), "yyyy-MM-dd") == $scope.exp.date.slice(0, 10) && $scope.exp.lasttimeout != null)) {
                        $scope.isDisabled = true;
                        $scope.isActive = true;
                        console.log('for both disabled');
                    }
                    else {
                        $scope.isDisabled = false;
                        $scope.isActive = true;
                        console.log('for punchIn');
                    }
                }
            }, function(err) {
                console.log('error');
            });
        };
        

        $scope.punchOut = function() {

            var date = new Date();
            var time = date.getHours();
            var minute = date.getMinutes();
            // $scope.empInfo = {userid:$rootScope.empData.id, date: date, timeout: time + ':' + minute};
            $scope.empInfo = {userid:$scope.tmpHomeData.id};
            console.log($scope.empInfo);

            $http.put('/punchin', $scope.empInfo).then(function(response) {
                console.log('punchout successfully');

                $scope.punchoutData = response.data;
                console.log($scope.punchoutData);

                $localStorage.punchoutSave = $scope.punchoutData;
                $scope.punchData = $localStorage.punchoutSave;
                console.log('punch out data', $scope.punchData);

                if ($filter('date')(new Date(), "yyyy-MM-dd") == $scope.punchData.date.slice(0, 10) && $scope.punchData.lasttimeout != null) {
                    $scope.isDisabled = true;
                    $scope.isActive = true;
                }
                else {
                    $scope.isDisabled = true;
                    $scope.isActive = false;
                }

            }, function(err) {
                console.log('error');
            });
        }


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