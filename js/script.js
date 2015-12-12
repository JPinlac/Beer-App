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
    $scope.selectedBeer = beerService.selectedBeer;
    $scope.selectBeer = function(beer) {
        beerService.setSelectedBeer(beer);
        console.log(beer)
    }

});

app.factory('beerService', function($http){
    service={};
    service.list=[];
    service.selectedBeer= new beer("Jon's sauce", 'So good it\'s amazing', 'bucket', '45%', '');

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
            var valueList = {
                'name': response.data[numBeers].name,
                'description':response.data[numBeers].description,
                'glass':response.data[numBeers].glass.name,
                'abv':response.data[numBeers].abv,
                'label':response.data[numBeers].labels.medium
            }
            
            while(numBeers<10 && numBeers < response.data.length){
<<<<<<< HEAD

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
=======
>>>>>>> e4b1c44d76e5a4001df6d6e231884f74ab1f4faa

                var newBeer = new beer('', '', '', '', '');
                for(attr in newBeer){
                    if(response.data[numBeers].hasOwnProperty(attr)){
                        newBeer[attr]=valueList[attr];
                    }
                }

                service.list[numBeers]=newBeer;
                numBeers++;
            };
            console.log(service.list)
        })

        service.setSelectedBeer = function(beer){
            service.selectedBeer = beer;
        }
    }
    return service;
});
