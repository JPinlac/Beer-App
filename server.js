<<<<<<< HEAD
var http = require('http');
var express = require('express');


http.createServer(function(request, response) {
    response.writeHead(200, { Content: "text/plain" });
    response.write("hi");
    response.end();
}).listen(8888);
=======
// server.js
var http = require('http');
var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');

app.post("/api", function(req, res){
  console.log(req.body);
  req2 = {
      
  }

  request.post({
    url: "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyCoQIPeDbqh72lEMuOH2yk663xzw-LYJWw",
    body: req,
    json: true,
    }, function (error, response, body){
      res.json(body);
    });

app.listen(process.env.PORT || 5000);


app.get("*", function(req, res) {
  res.sendfile('./index.html'); //load single view file
});
>>>>>>> d2d54923d421a635c048a7e1d83db309f4a067cc
