'use strict';

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var compress = require('compression');
var swig = require('swig');

module.exports = function(app, io, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';
  
  app.engine('swig', swig.renderFile);
  if(env == 'development'){
    app.set('view cache', false);
    swig.setDefaults({ cache: false });
  }
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'swig');

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(compress());
  app.use(express.static(config.root + '/public'));

  var Stove = require('../app/models/Stove');
  var stove = new Stove();

  io.on('connection', function connectSocket(socket) {
    socket.emit('status', stove);
  });

  stove.on('status', function onStoveStatus(stove) {
    io.emit('status', stove);
  });

  stove.on('toggleOnOff', function onStoveToggleOnOff(isOn) {
    io.emit('toggleOnOff', isOn);
  });

  var routes = require(config.root + '/app/routes')(stove);
  routes.forEach(function (route) {
    app.use(route);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  if(app.get('env') === 'development') {
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
};