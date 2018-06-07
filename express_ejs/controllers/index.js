var events = require('../data/event');
var path = require('path');

var MeteorologFenomena = require('../db/model/MeteorologPhenomena');
var ClimaticRecords = require('../db/model/ClimateRecords');
var WeatherTable = require('../db/model/CityWeatherTable');
var Station = require('../db/model/Station');
var TimeGaps = require('../db/model/TimeGaps');
var WaterTemperature = require('../db/model/waterTemerature');
var WeatherCityTable = require('../db/model/WeatherCity');
var ClimateData = require('../db/model/ClimateData');
var Regular_observable = require('../db/model/Regular_observable');

var Init = require('../db/init');

module.exports = {
  getMainPage: function (req, resp) {
    var promise = [];
    const arr = [];
    observe = '00';
    arr.push(TimeGaps.GetIdTimeGaps(observe));
    arr.push(Station.GetIdStation('zaporozhye'));
    Promise.all(arr)
      .then(res => {
        WeatherTable.GetZpWeather(res[0][0].id, res[1][0].id)
        .then(response => {
            promise.push(Station.GetIdStation('zaporozhye'));
            promise.push(WaterTemperature.GetTemperature());
            Promise.all(promise)
              .then(respons => {
                WeatherCityTable.GetAll().then(
                  answer => { resp.render('pages/home', { ZpTemperature: response[0], observe: observe, weatherObl: answer[0].WeatherTable, Water: respons[1][0]}) }
                )
                  
              })
              .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
      });
    
    
  },
  
  getCurrentWeather: function (req, response) {
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

    var buffer = [];
    var table = [];
    Station.GetIdStation(req.params.city)
    .then(res => {
      WeatherTable.GetCityTable(res[0].id)
      .then(respons => {
        for(var i=0; i<respons.length; i++){
          buffer.push(TimeGaps.GetTimeById(respons[i].TimeGapsId))
        }
        Promise.all(buffer)
        .then(resp => {
          for(var i=0; i<resp.length; i++){
            table.push(
              {
               Weather: respons[i].Weather, 
               Summer: resp[i].Summer,
               Winter: resp[i].Winter 
              })
          }
          table.sort(function(a, b){
            return Number(a.Summer) - Number(b.Summer);
          })
          response.render('pages/currentweather', { cityes: router, table: table })
        });
      });
    });    
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
      WeatherCityTable.GetAll()
      .then(
        respons => {
          ClimateData.Get()
          .then(
            response => {
              res.render('pages/hedrometeorological_bulletin', 
              { weatherObl: respons[0].WeatherTable,
                TextWeatherObl: respons[0].TextWeather, 
                weatherCity:  respons[1].WeatherTable, 
                TextWeatherCity: respons[1].TextWeather,
                ClimaticData: response[0],
                StormWarning: response[0].StormText
              });
            }
          );
          
        }
      );
   
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
    Regular_observable.GetAll()
    .then(resp => {
      res.render('pages/regular_observations', { data: resp });
    });
    
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