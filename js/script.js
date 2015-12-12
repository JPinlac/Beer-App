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
    $scope.submitSearch = function(searchTerm,amount) {
        beerService.getBeer(searchTerm,amount);
    }
});

app.controller('listController', function($scope, beerService){
     $scope.submitSearch2 = function(searchTerm,amount2, beer) {
        beerService.setSelectedBeer(beer);
        beerService.getBeer(searchTerm,amount2);
    }
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

    function beer(name, description, glass, abv, labels, style){
        this.name = name;
        this.description = description;
        this.glass = glass;
        this.abv = abv;
        this.labels = labels;
        this.style = style;
    }

    service.getBeer = function(searchTerm,amount){
        // Queries backend node server for list of beers
        // Adds resulting list to the service list pulling out relevant data
        //
        //

        var obj = {beer: searchTerm}
        $http.get('/search', {params:obj}).success(function(response){
            console.log(response);
            service.list.length=0;
            var numBeers = 0;
             valueList = {
                    'name': 'response.data[numBeers].name',
                    'description':'response.data[numBeers].description',
                    'glass':'response.data[numBeers].glass.name',
                    'abv':'response.data[numBeers].abv',
                    'label':'response.data[numBeers].labels.medium',
                    'style': 'response.data[numBeers].style.shortName'
                };

            while(numBeers<amount && numBeers < response.data.length){

                var newBeer = new beer('', '', '', '', '', '');
                console.log(newBeer);

                for(attr in valueList){
                    if(response.data[numBeers].hasOwnProperty(attr)){
                        newBeer[attr]=eval(valueList[attr]);
                    }
                }

                service.list[numBeers]=newBeer;
                numBeers++;
            };
        })

        service.setSelectedBeer = function(beer){
            service.selectedBeer = beer;
        }
    }
    return service;
});
