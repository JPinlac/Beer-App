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


app.controller('searchController', function($scope, beerService){
    $scope.submitSearch = function(searchTerm) {
        beerService.getBeer(searchTerm);
    }
});

app.factory('beerService', function($http){
    service={};
    service.getBeer = function(searchTerm){
        var obj = {beer: searchTerm}
        $http.get('/test', {params:obj}).success(function(response){
            var res = response;
            console.log(res)
        })
    }
    return service;
});
