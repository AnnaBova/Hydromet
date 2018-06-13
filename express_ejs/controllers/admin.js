const JWT = require('jsonwebtoken');
const ClimateData = require('../db/model/ClimateData');
const bcrypt = require('bcrypt');
const UserController = require('../db/model/user');
const Station = require('../db/model/Station');
const TimeGaps = require('../db/model/TimeGaps');
const WeatherTabel = require('../db/model/CityWeatherTable');
const waterTemperature = require('../db/model/waterTemerature');
const ClimateRecords = require('../db/model/ClimateRecords');
const Phenomena = require('../db/model/MeteorologPhenomena');
const WeatherCityTable = require('../db/model/WeatherCity');
const WeatherObservable = require('../db/model/WeatherObservable');

const saltRounds = 10;


module.exports = {
    getToken: function(req, res){
        UserController.Authorization(req.body.login)
        .then(respons => {
            bcrypt.compare(req.body.password, respons.password).then(
                resp => {
                    resp ? res.status(200).json(respons): res.status(401).send();
                }
            );
        });       
    }, 
    getStation: function(req, res){
        UserController.Authorization(req.user.login)
            .then(respons => {
                Station.GetStationById(respons.stationID)
                    .then(response => {
                        res.json(response);
                    })
                    .catch(err => res.status(401).send(err));
                })
            .catch(err => res.status(403).send(err));
    }, 
    addWeather: function(req, res){
        var PromiseArr = [];
        PromiseArr.push(TimeGaps.GetIdTimeGaps(req.body.TimeGaps));
        PromiseArr.push(UserController.Authorization(req.user.login));        
        Promise.all(PromiseArr)
            .then(respons => {
                var obj = {
                    Weather: {
                        temperature: req.body.temperature,
                        wind: req.body.wind,
                        pressure: req.body.pressure,
                        DirectionWind: req.body.DiractionWind,
                        phenomena: req.body.phenomena
                    },
                    date: req.body.date,
                    StationID: respons[1].stationID,
                    TimaGapsId: respons[0][0].id
                }
                waterTemperature.AddTemperature(respons[1].stationID, req.body.waterTemperature, req.body.date, req.body.TimeGaps);
                WeatherTabel.EditTables(obj);
            })
            .catch(err => console.log(err));
        res.send();
    },
    GetClimateRecords: function(req, res) {
        ClimateRecords.getAllRecords()
        .then(resp => res.json(resp));
        
    },
    saveRecords: function(req, res){
        for(var i=0;i< req.body.length; i++){
            ClimateRecords.UpdateRecords(req.body[i]);
        }
        res.send();
    },
    GetPhenomena: function(req, res){
        Phenomena.GetAllPhenomena()
        .then(respons => res.json(respons));
    },
    SavePhenomena: function(req, res){
        for(var i=0;i< req.body.length; i++){
            Phenomena.UpdateRecords(req.body[i]);
        }
        res.send();
    },
    GetHydroBulletind: function(req, res){
        WeatherCityTable.GetAll()
        .then(resp => res.json({
            WeatherObl: resp[0].WeatherTable,
            TextWeatherObl: resp[0].TextWeather, 
            WeatherCity:  resp[1].WeatherTable, 
            TextWeatherCity: resp[1].TextWeather,
        }) );
    },
    edit_weather_city_bulletin: function(req, res) {
        switch(req.body.index){
            case 0: {
                WeatherCityTable.EditTableCityRowById(req.body.data);
                break;
            }
            case 1: {
                WeatherCityTable.EditTextCityRowById(req.body.data)
                break;
            }
            case 2: {
                WeatherCityTable.EditTableOblRowById(req.body.data);
                break;
            }
            case 3: {
                WeatherCityTable.EditTextOblRowById(req.body.data)
                break;
            }
            default: res.send()
        }
        res.send();
    },
    GiveClimateDate: function (req, res) {
        ClimateData.EditClimateData(req.body);
        res.send();
    },
    GiveWeatherObservable: function(req, res){
        WeatherObservable.EditObservable(req.body);
            res.send();
        
    }
}