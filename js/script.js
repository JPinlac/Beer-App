var app = angular.module('myApp', ['ngRoute','ui.bootstrap']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/search.html',
            controller: 'searchController'
        })
        .when('/list', {
            templateUrl: 'partials/list.html',
            controller: 'listController'
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

app.controller('listController', function($scope, beerService){
    $scope.list=beerService.list

});

app.factory('beerService', function($http){
    service={};
    service.list=[];
    service.getBeer = function(searchTerm){
        var obj = {beer: searchTerm}
        $http.get('/test', {params:obj}).success(function(response){
            var res = response;
            var numBeers = 0;
            while(numBeers<10 && numBeers < res.data.length){
                service.list[numBeers]=res.data[numBeers].name;
                numBeers++;
            };
            console.log(res)
        })
    }
    return service;
});
