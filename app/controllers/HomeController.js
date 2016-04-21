'use strict';
var Article = require('../models/Article');

var HomeController = function HomeController() {
};

HomeController.prototype.getIndex = function getIndex(req, res) {
  res.render('index', {
    title: 'Generator-Express MVC',
    articles: [new Article(), new Article()]
  });  
};

module.exports = new HomeController();