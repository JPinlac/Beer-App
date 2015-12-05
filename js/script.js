var app = angular.module('myApp', ['ngRoute','ui.bootstrap']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/search.html',
            controller: 'searchController'
        })
        .when('/results', {
            templateUrl: 'partials/results.html',
            controller: 'resultsController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);


app.controller('searchController', function($scope, getBeer){


});


app.factory('getBeer', function($http){
    service={};
    return service;
});

