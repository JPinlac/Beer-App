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
// ?key=acacd14c7d296235ee91b5bcea5e64ed

app.factory('beerService', function($http){
    service={};
    service.getBeer = function(searchTerm){
        $http.get('http://api.brewerydb.com/v2/?key=acacd14c7d296235ee91b5bcea5e64ed/search?q=Goosinator&type=beer').success(function(response){
            console.log(response);
        })
    }
    return service;
});
