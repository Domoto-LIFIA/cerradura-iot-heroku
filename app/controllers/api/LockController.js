'use strict';

var LockController = function LockController(lock) {
  this.lock = lock;
  this.open = this.open.bind(this); 
  this.close = this.close.bind(this); 
  this.status = this.status.bind(this); 
};

LockController.prototype.open = function open(req, res) {
  var params = req.body || { };
  
  this.lock.open(params);
  res.json(this.lock);
};

LockController.prototype.close = function close(req, res) {
  this.lock.close();
  res.json(this.lock);
};

LockController.prototype.status = function status(req, res) {
  res.json(this.lock);
};

module.exports = LockController;
