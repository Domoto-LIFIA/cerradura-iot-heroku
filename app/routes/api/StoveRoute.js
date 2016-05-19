'use strict';

var express = require('express');
var StoveController = require('../../controllers/api/StoveController');

var StoveRoute = function StoveRoute(stove) {
  this.router = express.Router();
  this.controller = new StoveController(stove);
};

StoveRoute.prototype.config = function config() {
  this.router.post('/api/turnOn', this.controller.turnOn);
  this.router.post('/api/turnOff', this.controller.turnOff);
  this.router.get('/api/status', this.controller.status);
  
  return this.router;
};

module.exports = StoveRoute;