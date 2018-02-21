'use strict';

var util = require('util');
var events = require('events');

var Lock = function Lock () {
  events.call(this);
  
  this.isOpen = false;
  
  this.open = this.open.bind(this);
  this.close = this.close.bind(this);
  this._sendStatus = this._sendStatus.bind(this);
};

util.inherits(Lock, events);

Lock.prototype.open = function open() {
  this.isOpen = true;
  
  this._sendStatus();
  this.emit('toggleOpen', true);
};

Lock.prototype.close = function close() {
  this.isOpen = false;
  
  this._sendStatus();
  this.emit('toggleOpen', false);
};

Lock.prototype.getStatus = function getStatus(){
	return this.isOpen;
}

Lock.prototype._sendStatus = function _sendStatus() {
  this.emit('status', this);
};

Lock.prototype.toJSON = function toJSON() {
  var obj = { open: this.getStatus() }; 
  Object.assign(obj, this);
  delete obj.domain;
  delete obj._events;
  delete obj._eventsCount;
  
  return obj;
};

module.exports = Lock;
