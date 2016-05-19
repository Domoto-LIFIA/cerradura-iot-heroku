'use strict';

var HomeController = function HomeController(stove) {
  this.stove = stove;
  this.getIndex = this.getIndex.bind(this); 
};

HomeController.prototype.getIndex = function getIndex(req, res) {
  res.render('index', {
    title: 'Control',
    stove: this.stove
  });  
};

module.exports = HomeController;