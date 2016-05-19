'use strict';

var moment = require('moment');
var util = require('util');
var events = require('events');

var Stove = function Stove () {
  events.call(this);
  
  this.isOn = false;
  this.temperature = 'none';
  this.start = undefined;
  this.finish = undefined;
  this._timeout = undefined;
  this._interval = undefined;
  
  this.turnOn = this.turnOn.bind(this);
  this.turnOff = this.turnOff.bind(this);
  this._sendStatus = this._sendStatus.bind(this);
};

util.inherits(Stove, events);

Stove.prototype.turnOn = function turnOn(params) {
  var milliseconds = this._getMilliseconds(params.minutes);
  var minute = 60000;
  
  this.isOn = true;
  this.temperature = params.temperature;
  
  this.start = new Date();
  this.finish = new moment().add(milliseconds, 'milliseconds').toDate();
  
  clearTimeout(this._timeout);
  clearInterval(this._interval);
  
  this._timeout = setTimeout(this.turnOff, milliseconds);
  this._interval = setInterval(this._sendStatus, minute);
  
  this._sendStatus();
  this.emit('toggleOnOff', true);
};

Stove.prototype.turnOff = function turnOff() {
  this.isOn = false;
  this.temperature = 'none';
  this.start = undefined;
  this.finish = undefined;
  
  clearTimeout(this._timeout);
  clearInterval(this._interval);
  
  this._sendStatus();
  this.emit('toggleOnOff', false);
};

Stove.prototype.getDuration = function getDuration(time) {
  return moment(this.finish).diff(moment(new Date()), time) || undefined;
};

Stove.prototype._getMilliseconds = function _getMilliseconds(minutes) {
  return minutes * 60 * 1000;
};

Stove.prototype._sendStatus = function _sendStatus() {
  this.emit('status', this);
};

Stove.prototype.toJSON = function toJSON() {
  var obj = { minutes: this.getDuration('minutes'), seconds: this.getDuration('seconds') }; 
  Object.assign(obj, this);
  delete obj.domain;
  delete obj._timeout;
  delete obj._interval;
  delete obj._events;
  delete obj._eventsCount;
  
  return obj;
};

module.exports = Stove;