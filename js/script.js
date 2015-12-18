
var app = angular.module('myApp', ['ui.bootstrap','ui.router', 'stormpath','stormpath.templates']);
app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $stateProvider
        .state('search', {
            url: '/',
            templateUrl: 'partials/search.html',
            controller: 'searchController'
        })
        .state('list', {
            url: '/list',
            templateUrl: 'partials/list.html',
            controller: 'listController'
        })
        .state('beer', {
            url:'/beer',
            templateUrl: 'partials/beer.html',
            controller: 'listController'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'partials/login.html'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'partials/register.html'
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'partials/profile.html',
            controller: 'profileCtrl',
            sp: {
                authenticate: true
            }
        })
        .state('forgot', {
            url: '/forgot',
            templateUrl: 'partials/forgot-password.html'
        });

})
    .run(function($stormpath, $rootScope, $state){
        $stormpath.uiRouter({
            loginState: 'login',
            defaultPostLoginState:'search'
        });
        $rootScope.$on('$sessionEnd', function(){
            $state.transitionTo('login');
        });
    });

app.controller('searchController', function($scope, beerService){
    $scope.submitSearch = function(searchTerm,amount) {
        beerService.getBeer(searchTerm,amount);
    }
});

app.controller('listController', function($scope, beerService){
     $scope.submitSearch = function(searchTerm,amount2, beer) {
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

app.controller('profileCtrl', function ($scope, $http, $timeout) {
    $scope.saving = false;
    $scope.saved = false;
    $scope.error = null;
    $scope.formModel = {
      givenName: $scope.user.givenName,
      surname: $scope.user.surname,
      favoriteColor: $scope.user.customData.favoriteColor
    };

    $scope.submit = function() {
      $scope.error = null;
      $scope.saving = true;
      $http.post('/profile',$scope.formModel)
        .then(function(){
          $scope.saved = true;
          $timeout(function(){
            $scope.saved = false;
          },2000);
        })
        .catch(function(httpResponse){
          $scope.error = httpResponse &&
            httpResponse.data ? (
              httpResponse.data.userMessage ||
              httpResponse.data.message ||
              'An error has occured'
            ) : 'Server error';
        })
        .finally(function(){
          $scope.saving = false;
        });
    };
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
                    'labels':'response.data[numBeers].labels.medium',
                    'style': 'response.data[numBeers].style.shortName'
                };

            while(numBeers<amount && numBeers < response.data.length){


                var newBeer = new beer('', 'No Description Provided', 'Pint', 'None Provided', 'None Provided', '');


                for(attr in valueList){
                    if(response.data[numBeers].hasOwnProperty(attr)){
                        newBeer[attr]=eval(valueList[attr]);
                    }
                }

                service.list[numBeers]=newBeer;
                numBeers++;
            };
        })
    }
    service.setSelectedBeer = function(beer){
        service.selectedBeer = beer;
    }
    
    return service;
});
