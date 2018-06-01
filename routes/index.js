'use strict';
const express = require('express');
const router = express.Router();

const controller =  require('../controllers/');

router.get('/', controller.getMainPage);

router.get('/current/:city', controller.getCurrentWeather);

router.get('/agriculture',  controller.getAgriculturePage);

router.get('/hydrology_observable', controller.getHydrologyObservablePage);

router.get('/pollution', controller.getPollution);

router.get('/radiation', controller.getRadiation);

router.get('/contact', controller.getContact);

router.get('/structure', controller.getStructure);

module.exports = router;