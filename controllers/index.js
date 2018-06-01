var WeatherDays = require('../WeatherObl.json');
var waterTemperature = require('../waterTemperature.json');
var zptemperature = require('../zptemperature.json');
var CityWeatherTable = require('../CityWeatherTable.json');

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
    res.render('pages/meteorological_phenomena');
  },
  getHydrometeorologyBulletin: function(req, res){
    res.render('pages/hedrometeorological_bulletin', { weatherObl: WeatherDays.days });
  },
  getClimaticCharacteristic: function(req, res){
    res.render('pages/climatic_characteristic');    
  },
  getClimaticRecords: function(req, res){
    res.render('pages/climatic_records');
  },
  getRegularObservations: function(req, res){
    res.render('pages/regular_observations');
  },
  getEvents: function(req, res){
    res.render('pages/events');
  },
  getSingleEvents: function(req, res){
    res.render('pages/single_events');
  },
  getDecadeBulletin: function(req, res){
    res.render('pages/decade_bulletin');
  }
};