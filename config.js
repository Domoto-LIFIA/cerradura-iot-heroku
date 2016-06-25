'use strict';

var express = require('express'),
  swig = require('swig'),
  env = process.env.NODE_ENV || 'development';

var Config = function Config() {
  this.env = env;
  this.root = __dirname;
  this.name = 'mia-cucina';
  this.port = process.env.PORT || 3000;
  this.isDevelopment = env == 'development';
};

Config.prototype.configureLocalEnv = function configureLocalEnv(app) {
  app.locals.ENV = this.env;
  app.locals.ENV_DEVELOPMENT = this.isDevelopment;  
};

Config.prototype.configureViewEngine = function configureViewEngine(app) {
  app.engine('swig', swig.renderFile);
  app.set('view engine', 'swig');  

  if (!this.isDevelopment)
    return app.set('views', __dirname + '/dist/views');
  
  app.set('view cache', false);
  swig.setDefaults({ cache: false });
  app.set('views', __dirname + '/app/views');
};

Config.prototype.staticFiles = function staticFiles(app) {
  if (this.isDevelopment)
    return app.use(express.static(this.root + '/public')); 
  
  app.use('/css', express.static(this.root + '/dist/css'));
  app.use('/font', express.static(this.root + '/dist/font'));
  app.use('/fonts', express.static(this.root + '/dist/fonts'));
  app.use('/img', express.static(this.root + '/dist/img'));
  app.use('/js', express.static(this.root + '/dist/js'));
};

module.exports = new Config();