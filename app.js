'use strict';

var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

var config = require('./config/config');

require('./config/express')(app, io, config);

server.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});