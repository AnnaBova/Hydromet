var path = require('path');

var Chart = require('../db/model/Chart');
var MeteorologFenomena = require('../db/model/MeteorologPhenomena');
var ClimaticRecords = require('../db/model/ClimateRecords');
var WeatherTable = require('../db/model/CityWeatherTable');
var Station = require('../db/model/Station');
var TimeGaps = require('../db/model/TimeGaps');
var WaterTemperature = require('../db/model/waterTemerature');
var WeatherCityTable = require('../db/model/WeatherCity');
var ClimateData = require('../db/model/ClimateData');
var Regular_observable = require('../db/model/Regular_observable');
var WeatherObservable = require('../db/model/WeatherObservable');
var DecadBulletin = require('../db/model/DecadBulletin');
var Events = require('../db/model/Events');
const DagerGydrolygy = require('../db/model/DangerGydrolygy');

var Init = require('../db/init');

module.exports = {
  getMainPage: function (req, resp) {
    var promise = [];
    const arr = [];
    observe = '00';
    arr.push(TimeGaps.GetIdTimeGaps(observe));
    arr.push(Station.GetIdStation('zaporozhye'));
    arr.push(Station.GetIdStation('prism'));
    arr.push(Station.GetIdStation('kyrylivka'));
    arr.push(Station.GetIdStation('gulyaypole'));
    arr.push(Station.GetIdStation('berdyansk'));
    arr.push(Station.GetIdStation('melitopol'));
    arr.push(Station.GetIdStation('botievye'));
    Promise.all(arr)
      .then(res => {
        var cityarr = [];
        cityarr.push(WeatherTable.GetZpWeather(res[0][0].id, res[1][0].id));
        cityarr.push(WeatherTable.GetZpWeather(res[0][0].id, res[2][0].id));
        cityarr.push(WeatherTable.GetZpWeather(res[0][0].id, res[3][0].id));
        cityarr.push(WeatherTable.GetZpWeather(res[0][0].id, res[4][0].id));
        cityarr.push(WeatherTable.GetZpWeather(res[0][0].id, res[5][0].id));
        cityarr.push(WeatherTable.GetZpWeather(res[0][0].id, res[6][0].id));
        cityarr.push(WeatherTable.GetZpWeather(res[0][0].id, res[7][0].id));
        Promise.all(cityarr)
        .then(response => {
          promise.push(Station.GetIdStation('zaporozhye'));
              promise.push(WaterTemperature.GetTemperature());
              Promise.all(promise)
                .then(respons => {
                  WeatherCityTable.GetAll().then(
                    answer => { resp.render('pages/home', { 
                        ZpTemperature: response[0][0], 
                        observe: observe, 
                        weatherObl: 
                        answer[0].WeatherTable, 
                        Water: respons[1][0],
                        CityesWeather: response
                      }) 
                    }
                  )
                    
                })
                .catch(err => console.log(err));
        });
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
                    });
                }
                table.sort(function(a, b){
                  return Number(a.Summer) - Number(b.Summer);
                });
                var arr = [];
                observe = '00';
                arr.push(TimeGaps.GetIdTimeGaps(observe));
                arr.push(Station.GetIdStation('zaporozhye'));
                arr.push(Station.GetIdStation('prism'));
                arr.push(Station.GetIdStation('kyrylivka'));
                arr.push(Station.GetIdStation('gulyaypole'));
                arr.push(Station.GetIdStation('berdyansk'));
                arr.push(Station.GetIdStation('melitopol'));
                arr.push(Station.GetIdStation('botievye'));
                Promise.all(arr)
                  .then(res => {
                    var cityarr = [];
                    cityarr.push(WeatherTable.GetZpWeather(res[0][0].id, res[1][0].id));
                    cityarr.push(WeatherTable.GetZpWeather(res[0][0].id, res[2][0].id));
                    cityarr.push(WeatherTable.GetZpWeather(res[0][0].id, res[3][0].id));
                    cityarr.push(WeatherTable.GetZpWeather(res[0][0].id, res[4][0].id));
                    cityarr.push(WeatherTable.GetZpWeather(res[0][0].id, res[5][0].id));
                    cityarr.push(WeatherTable.GetZpWeather(res[0][0].id, res[6][0].id));
                    cityarr.push(WeatherTable.GetZpWeather(res[0][0].id, res[7][0].id));
                    Promise.all(cityarr)
                      .then(answer => {
                        response.render('pages/currentweather', { CityesWeather: answer, cityes: router, table: table })
                       }) });
                
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));    
  },

  getAgriculturePage: function (req, res) {
    res.render('pages/Agriculture');
  },

  getHydrologyObservablePage: function (req, res) {
    res.render('pages/hydrology_observable');
  },
  getPollution: function(req, res){
    Chart.GetAll().then(respons => {
      res.render('pages/pollution', { pollution: respons });
    })
    
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
              WeatherObservable.getAll()
              .then(answer => {
                res.render('pages/hedrometeorological_bulletin', 
                { weatherObl: respons[0].WeatherTable,
                  TextWeatherObl: respons[0].TextWeather, 
                  weatherCity:  respons[1].WeatherTable, 
                  TextWeatherCity: respons[1].TextWeather,
                  ClimaticData: response[0],
                  StormWarning: response[0].StormText,
                  WeatherObservable: answer[0],
                  StationWeather: answer[0].StationWeather,
                  print: false
                });
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
        DagerGydrolygy.GetAll()
          .then(respons => {
            res.render('pages/regular_observations', { data: resp, danger:respons[0].text});
          })
      });
    
  },
  getEvents: function(req, res){
    var perPage = 4;
    Promise.all(Events.GetAll(req.params.page, perPage))
      .then(respons => {
        res.render('pages/events', { 
          events: respons[0],
          current: req.params.page,
          pages: Math.ceil(respons[1] / perPage) 
        });
      })
    
  },
  getSingleEvents: function(req, res){
    Events.GetEventOne(req.params.id)
    .then(respons => {
        res.render('pages/single_events', { event: respons });
    })
    
  },
  getDecadeBulletin: function(req, res){
    DecadBulletin.GetBulletin()
      .then(response => {
        console.log(response);
        res.render('pages/decade_bulletin', {decada: response.Decad});
      });
  },
  getAdmin: function(req, res){
    res.sendFile(path.resolve('public/build/index.html'))
  }
};