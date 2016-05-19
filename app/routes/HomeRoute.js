'use strict';

var express = require('express');
var HomeController = require('../controllers/HomeController');

var HomeRoute = function HomeRoute(stove) {
  this.router = express.Router();
  this.controller = new HomeController(stove);
};

HomeRoute.prototype.config = function config() {
  this.router.get('/', this.controller.getIndex);
  
  return this.router;
};

module.exports = HomeRoute;