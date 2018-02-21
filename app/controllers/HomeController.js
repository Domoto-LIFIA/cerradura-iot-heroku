'use strict';

var HomeController = function HomeController() {
  this.getIndex = this.getIndex.bind(this); 
};

HomeController.prototype.getIndex = function getIndex(req, res) {
  res.render('index', { title: 'Cerradura' });
};

module.exports = HomeController;
