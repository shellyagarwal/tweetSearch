(function() {
    'use strict';
    angular.module('appname', ['ngRoute', 'ngResource', 'templates', 'ui.router', 'ngAnimate', 'ngAria', 'ngMaterial', 'ng-token-auth'])
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            '$locationProvider',
            '$authProvider',
            function($stateProvider, $urlRouterProvider, $locationProvider, $authProvider) {

                $authProvider.configure([{
                    default: {
                        apiUrl: '/api',
                        proxyIf: function() { window.isOldIE(); }
                    }
                }]);

                $stateProvider
                    .state('home', {
                        url: '/',
                        templateUrl: 'home/_home.html',
                        controller: 'HomeCtrl'
                    });

                $urlRouterProvider.otherwise('/');

                $locationProvider.html5Mode(true);
            }
        ]);
})();