'use strict';

var Index = function() {
  this.socket = io();
  this.lock = new LockClient();
  
  this.$form = $('#form');
  this.$abrir = $('#abrir');
  
  this.$textEstado = $('#textEstado');
  
  this.toggleOpen = this.toggleOpen.bind(this);
  this._showOpen = this._showOpen.bind(this);
  this._changeStatus = this._changeStatus.bind(this);
  
  this.$abrir.click(this.toggleOpen);
  this.socket.on('status', this._changeStatus);
  this.socket.on('toggleOpen', this._showOpen);
};

Index.prototype.getModel = function getModel() {
  var formData = this.$form.serializeArray().reduce(function(data, formData){
    data[formData.name] = formData.value;
    return data;  
  }, {});
  
  formData.minutes = parseInt(formData.minutes, 10);
  
  return formData;
};

Index.prototype.toggleOpen = function open() {
  if (this.$abrir.prop('checked'))
    this.lock.open(this.getModel());
  else
    this.lock.close();
};

Index.prototype.alert = function alert (message) {
  Materialize.toast(message, 3000, 'rounded');
};

Index.prototype._showOpen = function _showOpen(isOpen) {
  this.alert(isOpen ? 'La puerta ha sido abierta' : 'La puerta ha sido cerrada');

};
Index.prototype._changeStatus = function _changeStatus(response) {
  this.$abrir.prop('checked', response.isOpen);
  
  if (response.isOpen) {
    this.$textEstado.text('Abierto');    
  }
  else {
    this.$textEstado.text('Cerrado');
  }
};

