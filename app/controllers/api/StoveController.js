'use strict';

var StoveController = function StoveController(stove) {
  this.stove = stove;
  this.turnOn = this.turnOn.bind(this); 
  this.turnOff = this.turnOff.bind(this); 
  this.status = this.status.bind(this); 
};

StoveController.prototype.turnOn = function turnOn(req, res) {
  var params = req.body || { };
  params.minutes = params.minutes || 5; 
  params.temperature = params.temperature || 'medium';
  
  this.stove.turnOn(params);
  res.json(this.stove);
};

StoveController.prototype.turnOff = function turnOff(req, res) {
  this.stove.turnOff();
  res.json(this.stove);
};

StoveController.prototype.status = function status(req, res) {
  res.json(this.stove);
};

module.exports = StoveController;