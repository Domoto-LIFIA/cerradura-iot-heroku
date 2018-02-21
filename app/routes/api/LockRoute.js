'use strict';

var express = require('express');
var LockController = require('../../controllers/api/LockController');

var LockRoute = function LockRoute(lock) {
  this.router = express.Router();
  this.controller = new LockController(lock);
};

LockRoute.prototype.config = function config() {
  this.router.post('/api/open', this.controller.open);
  this.router.post('/api/close', this.controller.close);
  this.router.get('/api/status', this.controller.status);
  
  return this.router;
};

module.exports = LockRoute;
