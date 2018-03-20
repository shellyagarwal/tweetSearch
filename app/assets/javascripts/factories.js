'use strict';

angular.module('appname')
    .factory('mzFunctions', ['$window', function($window) {
        return {
            showNoty: function(message, type) {
                noty({
                    text: message,
                    layout: 'topCenter',
                    theme: 'relax',
                    timeout: 5000,
                    type: type,
                    closeWith: ['button']
                });
            },
            scrollToTop: function() {
                $window.scrollTo(0, 0);
            }
        };
    }]);