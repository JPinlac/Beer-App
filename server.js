// server.js
var http = require('http');
// var cors = require('cors');
var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
// app.use(function(req, res, next) { 
//     res.header("Access-Control-Allow-Ori­gin", "*"); 
//     res.header('Access-Control-Allow-Met­hods','GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Hea­ders', 'Content-Type');
//     next();
// })
// app.use(cors())

app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept");
next();
});
app.use(express.static(__dirname + '/'));
app.listen(8888);




app.get("/", function(req, res) {
  res.sendfile('./index.html'); //load single view file
});
