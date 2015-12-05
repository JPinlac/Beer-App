var http = require('http');
var express = require('express');


http.createServer(function(request, response) {
    response.writeHead(200, { Content: "text/plain" });
    response.write("hi");
    response.end();
}).listen(8888);
