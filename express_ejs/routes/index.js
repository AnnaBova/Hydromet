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

router.get('/events/:page', controller.getEvents);

router.get('/single_events/:id', controller.getSingleEvents);

router.get('/decade_bulletin', controller.getDecadeBulletin);

router.get('/signup', controller.getAdmin);

router.post('/token', admincontroller.getToken);

router.get('/station', ExpressJSW({secret: 'hydromet'}), admincontroller.getStation);

router.post('/addweather', ExpressJSW({secret: 'hydromet'}), admincontroller.addWeather);

router.get('/get_climate_records', admincontroller.GetClimateRecords );

router.post('/save_records', ExpressJSW({secret: 'hydromet'}), admincontroller.saveRecords);

router.get('/get_phenomena', admincontroller.GetPhenomena);

router.post('/save_phenomena', ExpressJSW({secret: 'hydromet'}), admincontroller.SavePhenomena);

router.get('/get_hydrometeorologycal_bulletin', admincontroller.GetHydroBulletind);

router.post('/edit_weather_city_buletttin', ExpressJSW({secret: 'hydromet'}), admincontroller.edit_weather_city_bulletin);

router.post('/give_climate_date', ExpressJSW({secret: 'hydromet'}), admincontroller.GiveClimateDate);

router.post('/give_weather_observable', ExpressJSW({secret: 'hydromet'}), admincontroller.GiveWeatherObservable);

router.post('/give_decad_bulletin', ExpressJSW({secret: 'hydromet'}), admincontroller.GiveDecadBulletin);

router.get('/air_pollution', admincontroller.GetAirPollution);

router.post('/edit_air_pollution', ExpressJSW({secret: 'hydromet'}), admincontroller.EditAirPollution);

router.get('/get_regular_observable', admincontroller.GetRegularObservable);

router.post('/edit_regular_observable', admincontroller.EditRegularObservable);

router.post('/files', admincontroller.UploadFile);

router.get('/get_events', admincontroller.getEvents);

router.post('/delete_event', admincontroller.deleteEvent);

router.post('/get_station_id', admincontroller.getStationid);

router.post('/add_weather_station', admincontroller.AddWeatherByStation);

router.get('/get_climate_data', admincontroller.GetClimateData);

router.get('/get_observvable_weather', admincontroller.GetObservableData);

router.get('/get_email_addres', admincontroller.GetEmailAddres);

router.post('/give_email_addres', admincontroller.EmailSender);

router.post('/add_email', admincontroller.AddEmail);

router.post('/delete_email', admincontroller.DeleteEmail);

router.post('/send_mail', admincontroller.SendMail);

router.post('/give_submit_danger', admincontroller.GiveSubmitDangerGydrolog);

router.get('/get_radionatial', admincontroller.GetRadionatiol);

router.post('/edit_radionatial', admincontroller.EditRadionatial);

module.exports = router;