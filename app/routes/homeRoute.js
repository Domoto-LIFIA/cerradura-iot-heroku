'use strict';

var router = require('express').Router();
var controller = require('../controllers/HomeController');


router.get('/', controller.getIndex);

module.exports = router;