'use strict';

angular.module('core').controller('loginController',['$scope', '$http', '$rootScope', '$location', '$localStorage', 
    function($scope, $http, $rootScope, $location, $localStorage, Authentication) {
        $scope.login = function() {
            $scope.employee = {username: $scope.email, password: $scope.password};
    
            // $http.post('http://192.168.1.6:3000/logincheck', $rootScope.employee).then(function(result) {
            //     console.log('result', result);
            //     $rootScope.empData = result.data;
            //     $rootScope.adminData = result.data.result;
            //     console.log($rootScope.empData);
    
            //     if ($scope.empData.msg == 'login success') {
            //         console.log('login success');
            //         $location.path('/home');
            //     }
            //     else if ($scope.empData.msg == 'incorrrect email') {
            //         alert('incorrrect email');
            //     }
            //     else if ($scope.empData.msg == 'incorrrect password') {
            //         alert('incorrrect password');
            //     }else if ($scope.empData.msg == 'admin login') {
            //         $location.path('/admin');
            //     }
            // }, function(err) {
            //     console.log('error', err);
            //     } 
            // );
            
            // if ($scope.email == "admin" && $scope.password == "123") {
            //     console.log('login success');
            //     $location.path('/home');
            // }
            // else if ($scope.email == "admin" && $scope.password == "admin") {
            //     $location.path('/admin');
            // }


        // $scope.signin = function() {
            $http.post('/auth/signin', $scope.employee).success(function(response) {
                // If successful we assign the response to the global user model
                $scope.empData = response;
                console.log($scope.empData);
                $localStorage.save = $scope.empData;

                if ($scope.empData.msg == 'admin login') {
                    console.log('admin login success');
                    $location.path('/admin');
                }
                else {
                    // And redirect to the index page
                    $location.path('/home');
                }
            }).error(function(response) {
                $scope.error = response.message;
            });
        // };


        //get the IP addresses associated with an account
        function getIPs(callback){
            var ip_dups = {};

            //compatibility for firefox and chrome
            var RTCPeerConnection = window.RTCPeerConnection
                || window.mozRTCPeerConnection
                || window.webkitRTCPeerConnection;
            var useWebKit = !!window.webkitRTCPeerConnection;

            //bypass naive webrtc blocking using an iframe
            if(!RTCPeerConnection){
                //NOTE: you need to have an iframe in the page right above the script tag
                //
                //<iframe id="iframe" sandbox="allow-same-origin" style="display: none"></iframe>
                //<script>...getIPs called in here...
                //
                var win = iframe.contentWindow;
                RTCPeerConnection = win.RTCPeerConnection
                    || win.mozRTCPeerConnection
                    || win.webkitRTCPeerConnection;
                useWebKit = !!win.webkitRTCPeerConnection;
            }

            //minimal requirements for data connection
            var mediaConstraints = {
                optional: [{RtpDataChannels: true}]
            };

            var servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};

            //construct a new RTCPeerConnection
            var pc = new RTCPeerConnection(servers, mediaConstraints);

            function handleCandidate(candidate){
                //match just the IP address
                var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
                var ip_addr = ip_regex.exec(candidate)[1];

                //remove duplicates
                if(ip_dups[ip_addr] === undefined)
                    callback(ip_addr);

                ip_dups[ip_addr] = true;
            }

            //listen for candidate events
            pc.onicecandidate = function(ice){

                //skip non-candidate events
                if(ice.candidate)
                    handleCandidate(ice.candidate.candidate);
            };

            //create a bogus data channel
            pc.createDataChannel("");

            //create an offer sdp
            pc.createOffer(function(result){

                //trigger the stun server request
                pc.setLocalDescription(result, function(){}, function(){});

            }, function(){});

            //wait for a while to let everything done
            setTimeout(function(){
                //read candidate info from local description
                var lines = pc.localDescription.sdp.split('\n');

                lines.forEach(function(line){
                    if(line.indexOf('a=candidate:') === 0)
                        handleCandidate(line);
                });
            }, 1000);
        }

        //Test: Print the IP addresses into the console
        var quit = false;
        getIPs(function(ip) {
            if(quit) {
                return;
             }
             quit = true;
             //$rootScope.userIP = ip;
             $localStorage.userIP = ip;
             //console.log($rootScope.userIP);
             console.log($localStorage.userIP);
         });
        
    }

}]);

