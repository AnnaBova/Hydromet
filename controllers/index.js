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
  getPollution: function(req,res){
    res.render('pages/pollution');
  },
  getRadiation: function(req,res){
    res.render('pages/radiation');
  },
  getContact: function(req,res){
    res.render('pages/contact');
  },
  getStructure: function(req,res){
    res.render('pages/structure');
  },
};