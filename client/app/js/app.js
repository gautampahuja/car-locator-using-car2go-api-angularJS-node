angular.module('c2g', ['ngRoute', 'ui.bootstrap']);

angular.module('c2g').config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'BaseController'
        }).otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true).hashPrefix('!');
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});