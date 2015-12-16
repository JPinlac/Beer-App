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

app.controller('listController', function($scope, beerService, foursquareService){
    $scope.list=beerService.list;
    $scope.selectedBeer = beerService.selectedBeer;
    $scope.selectBeer = function(beer) {
        beerService.setSelectedBeer(beer);
        console.log(beer)
    }

    foursquareService.setData


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

    service.getBeer = function(searchTerm){
        // Queries backend node server for list of beers
        // Adds resulting list to the service list pulling out relevant data
        //
        //
        var obj = {beer: searchTerm};
        $http.get('/search', {params:obj}).success(function(response){
            console.log(response)
            var numBeers = 0;
            var valueList = {
                    'name': 'response.data[numBeers].name',
                    'description':'response.data[numBeers].description',
                    'glass':'response.data[numBeers].glass.name',
                    'abv':'response.data[numBeers].abv',
                    'label':'response.data[numBeers].labels.medium',
                    'style': 'response.data[numBeers].style.shortName'
                };

            while(numBeers<10 && numBeers < response.data.length){

                var newBeer = new beer('', '', '', '', '', '');

                for(attr in valueList){
                    if(response.data[numBeers].hasOwnProperty(attr)){
                        newBeer[attr]=eval(valueList[attr]);
                    }
                }

                service.list[numBeers]=newBeer;
                numBeers++;
            };
        });
    }

        service.setSelectedBeer = function(beer){
            service.selectedBeer = beer;
        }

    return service;
});
var FOURSQ_SECRET = "WBSJVPI3S5RFQE2JORCN0WEGV3K11OVKSB2CRCAQPO2B3ULQ";
var FOURSQ_ID = "QD1ZIXEXF3GJFVQGEYLRABCS2JPBVR2N5Q1GJUZ1QSIB5L4A";

app.factory("foursquareService", function($http) {
    console.log("in fact");
    $http.get("https://api.foursquare.com/v2/venues/search?client_id="+FOURSQ_ID+"&client_secret="+FOURSQ_SECRET+"&v=20151215&ll=42.328,-83.044&query=coors").success(function(response) {
            
            console.log(response);

            var container = results;
            container.setData = function(results){
                service.getData = results;

            }
        });
    
    return {};//container;
});

// $http.get("https://api.foursquare.com/v2/
// checkins/4d627f6814963704dc28ff94?signature=LPtzP4edmpbaspdKhI9-892UoFM
// " + $scope.checkin)
//         .success(function(response) {
//           $scope.related = response;
//         });
//     }

//     $scope.update = function(movie) {
//       $scope.search = movie.Title;
//       $scope.change();
//     };

//     $scope.select = function() {
//       this.setSelectionRange(0, this.value.length);
//     }
  //"https://api.foursquare.com/v2/checkins/4d627f6814963704dc28ff94?signature=LPtzP4edmpbaspdKhI9-892UoFM&oauth_token=XAHZSUHUEUGZOJV2JNMFZY3JNKVROPPXWMDOY2O2RUFAP0CD&v=20151212"