'use strict';
const express = require('express');
const router = express.Router();
const ExpressJSW = require('express-jwt');
const controller =  require('../controllers/');
const admincontroller = require('../controllers/admin')

router.all('/*', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
})

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

router.get('/admin', controller.getAdmin);

router.post('/token', admincontroller.getToken);

router.get('/station', ExpressJSW({secret: 'hydromet'}), admincontroller.getStation);

router.post('/addweather', ExpressJSW({secret: 'hydromet'}), admincontroller.addWeather);

router.get('/get_climate_records', admincontroller.GetClimateRecords );

router.post('/save_records', admincontroller.saveRecords);

router.get('/get_phenomena', admincontroller.GetPhenomena);

router.post('/save_phenomena', admincontroller.SavePhenomena);

router.get('/get_hydrometeorologycal_bulletin', admincontroller.GetHydroBulletind);

router.post('/edit_weather_city_buletttin', admincontroller.edit_weather_city_bulletin);

router.post('/give_climate_date', admincontroller.GiveClimateDate);

router.post('/give_weather_observable', admincontroller.GiveWeatherObservable);

router.post('/give_decad_bulletin', admincontroller.GiveDecadBulletin);


module.exports = router;