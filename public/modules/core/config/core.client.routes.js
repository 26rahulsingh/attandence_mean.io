'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html',
			controller: 'loginController'
		})
		.state('/home', {
			url: '/home',
            templateUrl : 'modules/core/views/home.client-home.view.html',
            controller  : 'homeController'
        })
        .state('/applyleave', {
			url: '/applyleave',
            templateUrl : 'modules/core/views/home.client-applyleave.view.html',
            controller  : 'leaveController'
        })
        .state('/attandence', {
			url: '/attandence',
            templateUrl : 'modules/core/views/home.client-attandence.view.html',
            controller  : 'attandenceController'
        })
        .state('/holidays', {
			url: '/holidays',
            templateUrl : 'modules/core/views/home.client-holidays.view.html',
            controller  : 'holidaysController'
        })
        .state('/admin', {
			url: '/admin',
            templateUrl : 'modules/core/views/home.client-admin.view.html',
            controller  : 'adminController'
        })
        .state('/contact', {
			url: '/contact',
            templateUrl : 'modules/core/views/home.client-contact.view.html',
            controller  : 'contactController'
        })
        .state('/approve', {
            url: '/approve/:id/:date',
            templateUrl : 'modules/core/views/home.client-approve-disapprove-leave.view.html',
            controller  : 'approveController'
        })
	}
]);

