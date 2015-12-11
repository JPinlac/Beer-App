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
        .when('/beer', {
            templateUrl: 'partials/beer.html',
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
    $scope.list=beerService.list;

});

app.factory('beerService', function($http){
    service={};
    service.list=[];

    function beer(name, description, glass, abv, label){
        this.name = name;
        this.description = description;
        this.glass = glass;
        this.abv = abv;
        this.label = label;
    }

    service.getBeer = function(searchTerm){
        var obj = {beer: searchTerm}
        $http.get('/test', {params:obj}).success(function(response){

            var numBeers = 0;
            while(numBeers<10 && numBeers < response.data.length){
                console.log(numBeers)
                if(response.data[numBeers].hasOwnProperty('name')){
                    var newName = response.data[numBeers].name;
                }
                else{
                    var newName = '';
                }
                if(response.data[numBeers].hasOwnProperty('description')){
                    var newDesc = response.data[numBeers].description;
                }
                else{
                    var newDesc = '';
                }
                if(response.data[numBeers].hasOwnProperty('glass')){
                    var newGlass = response.data[numBeers].glass.name;
                }
                else{
                    var newGlass = '';
                }
                if(response.data[numBeers].hasOwnProperty('abv')){
                    var newAbv = response.data[numBeers].abv;
                }
                else{
                    var newAbv = '';
                }
                if(response.data[numBeers].hasOwnProperty('labels')){
                    var newLabel = response.data[numBeers].labels.medium;
                }
                else{
                    var newLabel = '';
                }


                var newBeer = new beer(newName, newDesc, newGlass, newAbv, newLabel);
                service.list[numBeers]=newBeer;
                numBeers++;
            };
            console.log(service.list)
        })
    }
    return service;
});
