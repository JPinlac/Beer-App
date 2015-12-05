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
        $http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&order=viewCount&publishedAfter=2015-01-01T00%3A00%3A00Z&publishedBefore=2015-12-31T00%3A00%3A00Z&q=beer&type=video&videoCategoryId=10&videoDuration=short&videoSyndicated=true&key=AIzaSyAcH5lbBeE0d_PovUz8XHtSj2dNvEzTauY').success(function(response){
            console.log(response);
        })
    }
    return service;
});
