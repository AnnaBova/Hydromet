var WeatherDays = require('../data/WeatherObl');
var waterTemperature = require('../data/waterTemperature');
var zptemperature = require('../data/zptemperature');
var CityWeatherTable = require('../data/CityWeatherTable');
var weatherCity = require('../data/weatherCity');
var textWeatherRegion = require('../data/TextWeatherRegion');
var textWeatherCity = require('../data/TextWeatherCity');
var ClimaticData = require('../data/climatic_date');
var Regular_Observation = require('../data/regular_observations');
var events = require('../data/event');
var path = require('path');

var MeteorologFenomena = require('../db/model/MeteorologPhenomena');
var ClimaticRecords = require('../db/model/ClimateRecords');


module.exports = {
  getMainPage: function (req, res) {
    res.render('pages/home', { ZpTemperature: zptemperature, weatherObl: WeatherDays.days, Water: waterTemperature});
  },
  
  getCurrentWeather: function (req, res) {
    var router = {
      "zaporozhye": false,
      "prism": true,
      "kyrylivka": false,
      "gulyaypole": false,
      "botievye": false,
      "melitopol": false,
      "berdyansk": false
    }
    for(key in router){
      router[key]=false;
    }
    router[req.params.city] = true;
    res.render('pages/currentweather', {cityes: router, table: CityWeatherTable[req.params.city] });
  },

  getAgriculturePage: function (req, res) {
    res.render('pages/Agriculture');
  },

  getHydrologyObservablePage: function (req, res) {
    res.render('pages/hydrology_observable');
  },
  getPollution: function(req, res){
    res.render('pages/pollution');
  },
  getRadiation: function(req, res){
    res.render('pages/radiation');
  },
  getContact: function(req, res){
    res.render('pages/contact');
  },
  getStructure: function(req, res){
    res.render('pages/structure');
  },
  getMeteorologPhenomena : function(req, res){
    MeteorologFenomena.GetAllPhenomena()
    .then(respons => {
      res.render('pages/meteorological_phenomena', {modalId: respons});
    });
  },
  getHydrometeorologyBulletin: function(req, res){
    res.render('pages/hedrometeorological_bulletin', 
    { weatherObl: WeatherDays.days,
      TextWeatherObl:textWeatherRegion.days, 
      weatherCity: weatherCity.days, 
      TextWeatherCity: textWeatherCity.days,
      ClimaticData: ClimaticData
    });
  },
  getClimaticCharacteristic: function(req, res){
    res.render('pages/climatic_characteristic');    
  },
  getClimaticRecords: function(req, res){
    ClimaticRecords.getAllRecords().then(respons => {
      res.render('pages/climatic_records', { modalId: respons });
    });
  },
  getRegularObservations: function(req, res){
    res.render('pages/regular_observations', { data:Regular_Observation });
  },
  getEvents: function(req, res){
    res.render('pages/events', {events: events.events});
  },
  getSingleEvents: function(req, res){
    res.render('pages/single_events');
  },
  getDecadeBulletin: function(req, res){
    res.render('pages/decade_bulletin');
  },
  getAdmin: function(req, res){
    res.sendFile(path.resolve('public/build/index.html'))
  }
};