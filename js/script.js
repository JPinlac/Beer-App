var app = angular.module('myApp', ['ngRoute','ui.bootstrap']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'search.html',
            controller: 'searchController'
        })
        .when('/results', {
            templateUrl: 'results.html',
            controller: 'resultsController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);


app.controller('searchController', function($scope, getSongs){
    $scope.searchSongs = function(searchTerm){
        getSongs.set(searchTerm);
    }
    $scope.songList = getSongs.songList;
    $scope.printList = function(){
        console.log(getSongs.songList);
    }

});


app.factory('getSongs', function($http){
    service={};
    service.songList=[];
    function song(title,url){
        this.title = title;
        this.url = url;
    }

    service.set = function(searchTerm){
        //format searchTerm to be usable in get request url
        var q = '';
        searchTerm = searchTerm.split(' ');
        q = searchTerm[0];
        for(var i = 1;i<searchTerm.length;i++){
            q=q + '+'+searchTerm[i];
        }

        var date = new Date;
        var year = date.getFullYear();
        for(var j = 0; j < 10; j++){
            $http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&order=viewCount&publishedAfter='+(year-j)+'-01-01T00%3A00%3A00Z&publishedBefore='+(year-j)+'-12-31T00%3A00%3A00Z&q='+q+'&type=video&videoCategoryId=10&videoDuration=short&videoSyndicated=true&key=AIzaSyAcH5lbBeE0d_PovUz8XHtSj2dNvEzTauY').success(function(response){
                console.log(response)
                var rand = Math.floor(Math.random()*40)+10
                var newSong = new song(response.items[rand].snippet.title, 'http://www.youtube.com/embed/'+response.items[rand].id.videoId);
                // service.songList[k]=newSong;
                service.songList.push(newSong)
            })
        }
        console.log(service.songList)
     };

    return service;
});

