'use strict';

var Index = function() {
  this.socket = io();
  this.stove = new StoveClient();
  
  this.$form = $('#form');
  this.$encender = $('#encender');
  
  this.$textTemperature = $('#textTemperature');
  this.$textMinute = $('#textMinute');
  this.$textEstado = $('#textEstado');
  
  this.$tiempo = $('#tiempo');
  this.$temperature = {
    high: $('#high'),
    medium: $('#medium'),
    low: $('#low')
  };
  
  this.toggleOnOff = this.toggleOnOff.bind(this);
  this._showOnOff = this._showOnOff.bind(this);
  this._changeStatus = this._changeStatus.bind(this);
  
  this.$encender.click(this.toggleOnOff);
  this.socket.on('status', this._changeStatus);
  this.socket.on('toggleOnOff', this._showOnOff);
};

Index.prototype.getModel = function getModel() {
  var formData = this.$form.serializeArray().reduce(function(data, formData){
    data[formData.name] = formData.value;
    return data;  
  }, {});
  
  formData.minutes = parseInt(formData.minutes, 10);
  
  return formData;
};

Index.prototype.toggleOnOff = function turnOn() {
  if (this.$encender.prop('checked'))
    this.stove.turnOn(this.getModel());
  else
    this.stove.turnOff();
};

Index.prototype.alert = function alert (message) {
  Materialize.toast(message, 3000, 'rounded');
};

Index.prototype._showOnOff = function _showOnOff(isOn) {
  this.alert(isOn ? 'La estufa ha sido encendida' : 'La estufa ha sido apagada');
};

Index.prototype._changeStatus = function _changeStatus(response) {
  this.$encender.prop('checked', response.isOn);
  
  if (response.isOn) {
    this.$textEstado.text('Encendido');    
    this.$textTemperature.text(this._getTemperatureLabel(response.temperature));
    
    if (response.minutes)
      this.$textMinute.text(response.minutes + ' min');
    else
       this.$textMinute.text(response.seconds + ' s');
  }
  else {
    this.$textEstado.text('Apagado');
    this.$textTemperature.text('');
    this.$textMinute.text('');
  }
};

Index.prototype._getTemperatureLabel = function _getTemperatureLabel (temperature) {
  switch (temperature) {
  case 'high': return 'Alta';
  case 'medium': return 'Media';
  case 'low': return 'Baja';
  }
  
  return 'Ninguna';    
};