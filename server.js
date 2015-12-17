// server.js
var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var request = require('request');
var concat = require('concat-stream');
var stormpath = require('express-stormpath');

app.get('/search', function(req, res){
    var q = req.query.beer;

    http.get('http://api.brewerydb.com/v2/search?q='+q+'&type=beer&key=acacd14c7d296235ee91b5bcea5e64ed', function(response){
        response.pipe(concat(function(data){
            res.json(JSON.parse(data));
        }))
    });
});

app.use(stormpath.init(app, {
    website: true,
    expand: {
        customData: true
    }
}))

app.use(express.static(__dirname + '/'));

app.on('stormpath.ready', function() {
    app.listen(8888);
})

app.get("/", function(req, res) {
  res.sendfile('./index.html'); //load single view file
});

app.post('/profile', bodyParser.json(), stormpath.loginRequired, require('./routes/profile'));