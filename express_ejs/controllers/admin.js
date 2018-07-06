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
const DecadeBulletin = require('../db/model/DecadBulletin');
const Chart = require('../db/model/Chart');
const Regular_observable = require('../db/model/Regular_observable');
const Events = require('../db/model/Events');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const { convert } = require('convert-svg-to-png');
const Email = require('../db/model/Email');
const EmailSender = require('./EmailSender');
const DagerGydrolygy = require('../db/model/DangerGydrolygy');
const radionatial = require('../db/model/radiotional');
const ClimateCharacteristic = require('../db/model/ClimateCharacteristic');
const pngToJpeg = require('png-to-jpeg');

module.exports = {
    EditClimateCharacteristic: function(req,res){
        ClimateCharacteristic.Edit(req.body.data);
        res.send();
    },
    GetClimateCharacteristick: function(req, res){
        ClimateCharacteristic.GetAll() 
            .then(respons => res.json(respons))
            .catch(err => console.log(err));
    },
    GiveSubmitDangerGydrolog: function(req, res){
        DagerGydrolygy.Edit(req.body);
        res.send();
    },
    SendMail: function(req, res){
        data = JSON.parse(req.body);
        EmailSender.test(data);
        res.send();
    },
    DeleteEmail: function(req, res){
        Email.Delete(req.body);
        res.send();
    },
    AddEmail: function(req, res){
        Email.Add(req.body).then(respons => res.json(respons));
    },
    EmailSender: function(req, res){
        res.send();
    },
    GetEmailAddres: function(req, res){
        Email.GetAll()
            .then(respons => {
                res.json(respons);
            })
    },
    CaruselUpload: function(req, res){
        var arr = req.files.file.name.split('.');
        let imageFile = req.files.file;
        var path1 = path.resolve(__dirname, '../public/assets/images');
        imageFile.mv(`${path1}/${req.files.file.name}`, function(err){
                if(err) {
                    console.log(err); return res.status(500).send();
                }
                if(req.files.file.mimetype != 'image/jpeg'){
                    let buffer = fs.readFileSync(path.resolve(__dirname, "../public/assets/images/" + req.files.file.name));
                    pngToJpeg({quality: 90})(buffer)
                        .then(output => {
                            fs.writeFileSync(path.resolve(__dirname, "../public/assets/images/"+ arr[0] + '.jpg'), output)
                            fs.unlinkSync(path.resolve(__dirname, "../public/assets/images/" + req.files.file.name));
                        });
                }
                res.send();
        })
    },
    getToken: function(req, res){
        UserController.Authorization(req.body.login)
        .then(respons => {
            if(respons !== null){
                bcrypt.compare(req.body.password, respons.password).then(
                    resp => {
                        resp ? res.status(200).json(respons): res.status(401).send();
                    }
                );
            }else {
                res.status(401).send();
            }
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
        .then(resp => {
            var obj = {
                WeatherObl: resp[0].WeatherTable,
                TextWeatherObl: resp[0].TextWeather, 
                WeatherCity:  resp[1].WeatherTable, 
                TextWeatherCity: resp[1].TextWeather,
            }
            WeatherObservable.getAll().then(response => {
                obj.WeatheObservable = response[0];
                res.json(obj);
            })
    });
    },
    edit_weather_city_bulletin: function(req, res) {
            switch(req.body.index){
                case 0: {
                    WeatherCityTable.EditTableCityRowById(req.body.data, res);
                    break;
                }
                case 1: {
                    WeatherCityTable.EditTextCityRowById(req.body.data, res)
                    break;
                }
                case 2: {
                    WeatherCityTable.EditTableOblRowById(req.body.data, res);
                    break;
                }
                case 3: {
                    WeatherCityTable.EditTextOblRowById(req.body.data, res)
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
            WeatherObservable.getAll().then(respons => {
                var template = fs.readFileSync( path.resolve('../express_ejs/views/partials/hydrometeorological_bulletni/svgMap.ejs'), 'utf-8' );
                var map = ejs.render(template, {StationWeather: respons[0].StationWeather, print: true});
                convert(map, {width: 668, heidht: 599})
                    .then(respons=> {
                        var encoded = new Buffer(respons).toString('base64');
                        fs.unlink('./public/assets/images/map.png', (err)=> {
                            fs.writeFile('./public/assets/images/map.png', encoded, 'base64', function(err){
                                if(err) console.log(err);
                                res.send();
                            })
                        })

                    })              
            })
             
        
    },
    GiveDecadBulletin: function(req, res){
            DecadeBulletin.Edit(req.body);
            res.send();
    },
    GetAirPollution: function(req, res){
        Chart.GetAll()
        .then(respons => {
            res.json(respons);
        })
    },
    EditAirPollution: function (req, res){
            Chart.Edit(req.body);
            res.send();
        
    },
    GetRegularObservable: function(req, res){
        Regular_observable.GetAll()
            .then(respons => {
                res.json(respons);
            }) 
    },
    EditRegularObservable: function(req, res){
        Regular_observable.Edit(req.body);
        res.send();
    },
    UploadFile: function(req, res){
        let imageFile = req.files.file;
        var path1 = path.resolve(__dirname, '../public/Events');
        imageFile.mv(`${path1}/${req.files.file.name}`, function(err){
            if(err) return res.status(500).send();

            Events.AddEvent({
                title: req.body.title,
                date: req.body.date,
                Picture: req.files.file.name,
                description: req.body.description,
                Text: req.body.text,
            });
            res.send();
        })
    },
    getEvents: function(req, res) {
        Events.GetEvent()
            .then(respons => res.json(respons))
            .catch(err => console.log(err));
    },
    deleteEvent: function(req, res){
        Events.Delete(req.body);
        res.send();
    },
    getStationid: function(req, res){
        Station.GetIdStation(req.body.station).then(respons => {
            res.json(respons[0]);
        })
        
    },
    AddWeatherByStation: function(req, res){
        var PromiseArr = [];
        PromiseArr.push(TimeGaps.GetIdTimeGaps(req.body.TimeGaps));
        PromiseArr.push(Station.GetIdStation(req.body.Station));
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
                    StationID: respons[1][0]._id,
                    TimaGapsId: respons[0][0]._id
                }
                waterTemperature.AddTemperature(respons[1][0]._id, req.body.waterTemperature, req.body.date, req.body.TimeGaps);
                WeatherTabel.EditTables(obj);
            })
            .catch(err => console.log(err));
        res.send();
    },
    GetClimateData: function(req, res){
        ClimateData.Get().then(respons => {
            res.json(respons[0]);
        })
    },
    GetObservableData:function (req, res){
        WeatherObservable.getAll().then(respons => {
            res.json(respons[0]);
        })
    },
    GetRadionatiol: function(req, res){
        radionatial.GetAll().then(respons => {
            res.json(respons);
        }) 
    },
    EditRadionatial: function(req,res){
        radionatial.Edit(req.body);
        res.send();
    }
}