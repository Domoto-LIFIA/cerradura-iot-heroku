#! /usr/bin/env node

'use strict';
var logger = require('morgan');
var bodyParser = require('body-parser');
var compress = require('compression');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Lock = require('./app/models/Lock');
var config = require('./config');

config.configureLocalEnv(app);
config.configureViewEngine(app);

//TODO: Mirar porque tiene un dev esto.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress());

config.staticFiles(app);
var lock = new Lock();

io.on('connection', function connectSocket(socket) {
  socket.emit('status', lock);
});

lock.on('status', function onLockStatus(lock) {
  io.emit('status', lock);
});

lock.on('toggleOpen', function onLockToggleOpen(isOpen) {
  io.emit('toggleOpen', isOpen);
});

var routes = require(config.root + '/app/routes')(lock);
routes.forEach(function (route) {
  app.use(route);
});

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if(config.isDevelopment) {
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      title: 'error'
    });
  });
}

app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    title: 'error'
  });
});

server.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});
