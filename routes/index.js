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

router.get('/meteorological_phenomena', controller.getMeteorologPhenomena);

router.get('/hydrometeorological_bulletin', controller.getHydrometeorologyBulletin);

router.get('/climatic_characteristic', controller.getClimaticCharacteristic);

router.get('/climatic_records', controller.getClimaticRecords);

router.get('/regular_observations', controller.getRegularObservations);

router.get('/events', controller.getEvents);

router.get('/single_events/:nummber', controller.getSingleEvents);

router.get('/decade_bulletin', controller.getDecadeBulletin);

module.exports = router;