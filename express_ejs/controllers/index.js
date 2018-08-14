var path = require('path');

const Chart = require('../db/model/Chart');
const MeteorologFenomena = require('../db/model/MeteorologPhenomena');
const ClimaticRecords = require('../db/model/ClimateRecords');
const WeatherTable = require('../db/model/CityWeatherTable');
const Station = require('../db/model/Station');
const TimeGaps = require('../db/model/TimeGaps');
const WaterTemperature = require('../db/model/waterTemperature');
const WeatherCityTable = require('../db/model/WeatherCity');
const ClimateData = require('../db/model/ClimateData');
const Regular_observable = require('../db/model/Regular_observable');
const WeatherObservable = require('../db/model/WeatherObservable');
const DecadBulletin = require('../db/model/DecadBulletin');
const Events = require('../db/model/Events');
const DagerGydrolygy = require('../db/model/DangerGydrolygy');
const radiotional = require('../db/model/radiotional');
const ClimateCharacteristic = require('../db/model/ClimateCharacteristic');
var Init = require('../db/init').Init;

const MONTHS = [
  "січень",
  "лютий",
  "березень",
  "квітень",
  "травень",
  "червень",
  "липень",
  "серпень",
  "вересень",
  "жовтень",
  "листопад",
  "грудень",
];

function getObserv(){
  var now = new Date();
  var hour = now.getHours();
    if(hour >= 0 && hour <= 2) {
      return '00'
    }
    if(hour >= 3 && hour <= 5){
      return '03'
    }
    if(hour >= 6 && hour <= 8){ 
      return '06'
    }
    if(hour >= 9 && hour <= 11){
      return '09'
    }
    if(hour >= 12 && hour <= 14){
      return '12'
    }
    if(hour >= 15 && hour <= 17){
      return '15'
    }
    if(hour >= 18 && hour <= 20){
      return '18'
    }
    if(hour >= 21 && hour <= 23){
      return '21'
    }
}

module.exports = {
  getMainPage: function (req, resp) {
    var promise = [];
    const arr = [];
    observe = getObserv();
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
        WeatherTable.GetStationWeather(res[3][0].id).then(res => console.log(res))
        var cityarr = [];
        cityarr.push(WeatherTable.GetStationWeather(res[1][0].id));
        cityarr.push(WeatherTable.GetStationWeather(res[2][0].id));
        cityarr.push(WeatherTable.GetStationWeather(res[3][0].id));
        cityarr.push(WeatherTable.GetStationWeather(res[4][0].id));
        cityarr.push(WeatherTable.GetStationWeather(res[5][0].id));
        cityarr.push(WeatherTable.GetStationWeather(res[6][0].id));
        cityarr.push(WeatherTable.GetStationWeather(res[7][0].id));
        Promise.all(cityarr)
        .then(response => {
          promise.push(Station.GetIdStation('zaporozhye'));
              promise.push(WaterTemperature.GetTemperature());
              Promise.all(promise)
                .then(respons => {
                  WeatherCityTable.GetAll().then(
                    answer => {
                      const date = new Date();
                      let day = date.getUTCDate();                      
                      day = (day < 10)? `0${day}` : `${day}`;
                      let month = date.getUTCMonth() + 1;
                      month = (month < 10)? `0${month}` : `${month}`;
                      const monthText = MONTHS[month];
                      const year = date.getUTCFullYear();
                      resp.render('pages/home', {
                        ZpTemperature: response[0][0],
                        observe: observe,
                        weatherObl: answer[0].WeatherTable,
                        Water: respons[1],
                        CityesWeather: response,
                        day,
                        month,
                        monthText,
                        year,
                      })
                    }
                  )

                })
                .catch(err => console.log(err));
        });
      });

  },

  GetInfoStation: function(req, res){
    Station.GetIdStation(req.params.station).then(respons => {
      res.render('pages/Station',{station: respons[0]});
    })

  },
  DownloadConvention: function(req, res) {
    if (req.params.number == 1) {
      var file = path.resolve(__dirname, '../public/document/Умовнi\ позначки.docx');
      res.download(file);
    }
    if (req.params.number == 2) {
      var file = path.resolve(__dirname, '../public/document/Поточна\ погода.docx');
      res.download(file);
    }
    if (req.params.number == 3) {
      var file = path.resolve(__dirname, '../public/document/Прогноз\ погоди.docx');
      res.download(file);
    }
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
                observe = getObserv();
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

                        const date = new Date();
                        const day = date.getDate();
                        const month = MONTHS[date.getMonth()];
                        const year = date.getFullYear();

                        response.render('pages/currentweather', { CityesWeather: answer, cityes: router, table: table , day, month, year})
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
      let month = respons[0].mounth
      let year = respons[0].year 
      res.render('pages/pollution', { pollution: respons, month, year });
    })

  },
  getRadiation: function(req, res){
    radiotional.GetAll()
    .then(respons => {
      res.render('pages/radiation', { data: respons });
    })
    .catch(err => console.log(err));

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
    ClimateCharacteristic.GetAll().then(respons => {
      res.render('pages/climatic_characteristic', {data: respons[0]});
    })
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
        if(!respons) res.redirect('/events/1');
        res.render('pages/single_events', { event: respons });
    })

  },
  getDecadeBulletin: function(req, res){
    DecadBulletin.GetBulletin()
      .then(response => {
        res.render('pages/decade_bulletin', {decada: response.Decad});
      });
  },
  getAdmin: function(req, res){
    res.sendFile(path.resolve('public/build/index.html'))
  },

  GetGydrologyMessage: function (req, res) {
    DagerGydrolygy.GetAll().then(data => {
      res.json(data[0]);
    }).catch(err => {
      if(err){
        console.log(err.message);
        res.sendStatus(500);
      }
    });
  }
};
