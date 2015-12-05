// server.js
var http = require('http');
var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');

app.listen(process.env.PORT || 5000);


app.get("*", function(req, res) {
  res.sendfile('./index.html'); //load single view file
});
