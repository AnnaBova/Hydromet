const JWT = require('jsonwebtoken');
const ClimateData = require('../db/model/ClimateData');
const bcrypt = require('bcrypt');
const UserController = require('../db/model/user');
const Station = require('../db/model/Station');
const TimeGaps = require('../db/model/TimeGaps');
const WeatherTabel = require('../db/model/CityWeatherTable');
const waterTemperature = require('../db/model/waterTemperature');
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
const Report = require('../db/model/ReportInfo')
const PATH_TO_IMAGE = '../public/Events/';
const pdfmake = require('pdfmake/build/pdfmake');
const pdfMakePrinter = require('pdfmake/src/printer');
const Initital = require('../db/init');

function createPdfBinary(pdfDoc, callback) {

    const fontDescriptors = {
      Roboto: {
        normal: path.join(__dirname, '..', 'public', '/fonts/Roboto-Regular.ttf'),
        bold: path.join(__dirname, '..', 'public', '/fonts/Roboto-Medium.ttf'),
        italics: path.join(__dirname, '..', 'public', '/fonts/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, '..', 'public', '/fonts/Roboto-MediumItalic.ttf')
      }
    };
  
    const printer = new pdfMakePrinter(fontDescriptors);
  
    const doc = printer.createPdfKitDocument(pdfDoc);
  
    const chunks = [];
  
    doc.on('data', function (chunk) {
      chunks.push(chunk);
    });
    doc.on('end', function () {
      const result = Buffer.concat(chunks);
      callback(result);
    });  
    doc.end();
  }

function GetMapPosition(station){
    switch(station){
        case 'zaporozhye':return {x: 240, y: 200};
        case 'prism': return { x: 265, y: 335 };
        case 'berdyansk': return { x: 370, y: 350 };
        case 'gylyaypole': return { x: 375, y: 210};
        case 'botievye': return {x: 335, y: 400};
        case 'kyrylivka': return { x: 375, y: 280};
        case 'melitopol': return { x: 180, y: 390};
        default: return {x:10, y:10};
    }
}

const reportMap = item => {
    return {
        stack: [
            {
                text: item.date,
                margin: [0,5,0,5],
                alignment: 'left',
                fontSize: 12
            },
            {
                text: item.text,
                margin: [65,-20,0,5],
                alignment: 'left',
                fontSize: 12
            }
        ]

    };
}

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
    GetReportInfo: function(req, res) {
        Report.Get().then(respons => res.json(respons))
    },
    UpdateReportInfo: function(req, res) {
        Report.Update(req.body).then(respons => res.json(respons))
    },
    GiveSubmitDangerGydrolog: function(req, res){
        DagerGydrolygy.Edit(req.body);
        res.send();
    },
    SendMail: function(req, res){
        EmailSender.test();
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
    getStationWeather: function (req, res){
      Promise.all([Station.GetIdStation('berdyansk'), Station.GetIdStation('zaporozhye')]).then(stationIds=>{
        WeatherTabel.GetCityTable(req.params.stationId).then(data => {
          if(req.params.stationId == stationIds[0][0]._id || req.params.stationId == stationIds[1][0]._id){
            waterTemperature.GetTemperature().then(waterTemperature=>{
              res.json({
                data,
                waterTemperature
              })
            })
          } else {
            res.json({data});
          }
        })
      }).catch(err =>{
        if(err){
          console.log(err.message);
          res.sendStatus(500);
        }
      });
    },

    GetAllGaps: function (req, res) {
        TimeGaps.GetAllTimeGaps().then(data => {
          data.sort((a, b)=>{
            return a.Summer - b.Summer;
          });
          res.json(data);
        }).catch(err => {
          if(err){
            console.log(err.message);
            res.sendStatus(500);
          }
        });
    },

    CaruselUpload: function(req, res){       
        const arr = req.files.file.name.split('.');        
        let imageFile = req.files.file;
        const path1 = path.resolve(__dirname, PATH_TO_IMAGE);
        imageFile.mv(`${path1}/${req.files.file.name}`, function(err){
                if(err) {
                    console.log(err); return res.status(500).send();
                }
                if(req.files.file.mimetype != 'image/jpeg'){
                    let buffer = fs.readFileSync(path.resolve(__dirname, PATH_TO_IMAGE + req.files.file.name));
                    pngToJpeg({quality: 90})(buffer)
                        .then(output => {
                            fs.writeFileSync(path.resolve(__dirname, PATH_TO_IMAGE+ arr[0] + '.jpg'), output)
                            fs.unlinkSync(path.resolve(__dirname, PATH_TO_IMAGE + req.files.file.name));
                        });
                }
                Station.AddPhoto(req.body.station,req.files.file.name);
                res.send();
        })
    },
    GetWaterTemperature: function (req, res){
      waterTemperature.GetTemperature().then(data => {
        res.json(data);
      }).catch(err => {
        if(err){
          console.log(err.message);
        }
        res.sendStatus(500);
      });
    },
    SetWaterTemperature: function (req, res){
      waterTemperature.UpdateTemperature(req.body).then(data => {
        res.json(data);
      }).catch(err => {
        if(err){
          console.log(err.message);
        }
        res.sendStatus(500);
      });
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
                const queryArray = req.body.map((item)=>{
                    return WeatherTabel.EditTables(item);
                });
                Promise.all(queryArray).then(()=>{
                    res.end();
                })
            })
            .catch(err => console.log(err));
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

    GiveWeatherObservableApi: function(req, res){
            WeatherObservable.EditObservable(req.body);
            WeatherObservable.getAll().then(respons => {
                var template = fs.readFileSync( path.resolve('../express_ejs/views/partials/hydrometeorological_bulletni/svgMap.ejs'), 'utf-8' );
                var map = ejs.render(template, {StationWeather: respons[0].StationWeather, print: true});
                convert(map, {width: 668, heidht: 599})
                    .then(resp=> {
                        var encoded = new Buffer(resp).toString('base64');
                        fs.unlink('./public/assets/images/map.png', (err)=> {
                            fs.writeFile('./public/assets/images/map.png', encoded, 'base64', function(err){
                                if(err) console.log(err);
                                res.json(respons);
                            })
                        })

                    })
            }).catch(err => {
              if(err){
                console.log(err.message);
                res.sendStatus(500);
              }
            });
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
        console.log(req.body)
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
        var path1 = path.resolve(__dirname, PATH_TO_IMAGE);
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
        Events.GetEventOne(req.body).then(data => {
          fs.unlink(`${path.resolve(__dirname, PATH_TO_IMAGE)}/${data.Picture}`, (err => {
            if(err){
              return console.log(err.message);
            }
            Events.Delete(req.body);
            res.end();
          }));
        }).catch(err => {
          if(err){
            console.log(err.message);
          }
        });
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
    },

    GetStationPhotos: function(req, res){
      Station.GetPhotosByName(req.params.stationId).then(data => {
        res.json(data.photo);
      }).catch(err => {
        if(err){
          console.log(err.message);
          res.sendStatus(500);
        }
      });
    },

    DeleteStationPhoto: function(req, res) {
      Station.DeletePhoto(req.params.stationId, req.body.photo).then(data => {
        fs.unlink(`${path.resolve(__dirname, PATH_TO_IMAGE)}/${req.body.photo}`, (err => {
          if(err){
            return console.log(err.message);
          }
          res.end();
        }));
      }).catch(err => {
        if(err){
          console.log(err.message);
          res.sendStatus(500);
        }
      })
    },

    getDecadeBulletin: function(req, res){
      DecadeBulletin.GetBulletin().then(data => {
        res.send(data.Decad);
      }).catch(err => {
        if(err){
          console.log(err.message);
          res.sendStatus(500);
        }
      });
    },

    PostEvent: function (req, res) {
      if(!req.files){
        Events.UpdateEventNoImage({
          _id: req.body._id,
          title: req.body.title,
          date: req.body.date,
          description: req.body.description,
          text: req.body.text,
        }).then(data => {

        })
      }else{
        Events.GetEventOne(req.body._id).then(data => {
          const imageFile = req.files.file;
          const path1 = path.resolve(__dirname, PATH_TO_IMAGE);
          fs.unlink(`${path1}/${data.Picture}`, err => {
            imageFile.mv(`${path1}/${imageFile.name}`, function(err){
                if(err) return res.sendStatus(500);
                Events.UpdateEvent({
                  _id: req.body._id,
                  title: req.body.title,
                  date: req.body.date,
                  Picture: imageFile.name,
                  description: req.body.description,
                  text: req.body.text,
                }).then(data => {
                  res.end()
                });
            })
          });
        });
      }
      res.end();
    },
    GetBulletin: async function (req, res) {
        const climateData = await ClimateData.Get().exec();
        const reportInfo = await Report.Get().exec();
        const weatherInfo = await WeatherCityTable.GetAll().exec();
        const weatherObservable = await WeatherObservable.getAll().exec();
        
        const textWeatherCity = weatherInfo[0].TextWeather.map(reportMap);
        const textWeatherObl = weatherInfo[1].TextWeather.map(reportMap);

        const pdfObject = {
            pageSize: 'A4',
            pageMargins: [ 40, 10, 40, 60 ],
            content: [
                {
                    image:'public/assets/images/herb.jpg',
                    alignment: 'center'
                },
                {
                  text: 'ДЕРЖАВНА СЛУЖБА УКРАЇНИ З НАДЗВИЧАЙНИХ СИТУАЦІЙ',
                  style: 'bold',
                  fontSize: 11,
                  alignment: 'center',
                  margin: [0,20,0,0]
                },
                {
                  text: 'ЗАПОРІЗЬКИЙ ОБЛАСНИЙ ЦЕНТР З ГІДРОМЕТЕОРОЛОГІЇ',
                  style: 'bold',
                  fontSize: 13,
                  alignment: 'center'
                },
                {
                  text: '(ЗАПОРІЗЬКИЙ ЦГМ)',
                  style: 'bold',
                  alignment: 'center',
                  fontSize:10
                },
                {
                    text:'69095, м. Запоріжжя, пр. Соборний, 105,  тел/факс. (061) 787-62-06, 787-62-09',
                    alignment: 'center',
                    fontSize:8
                },
                {
                    text:'E-mail: pgdzaporozh@meteo.gov.ua, zcgm@ukr.net',
                    alignment: 'center',
                    fontSize:8
                },
                {
                    text:`Гідрометеорологічний бюлетень №${climateData[0].number}`,
                    style: 'bold',
                    alignment: 'center',
                    margin: [0,15,0,0]
                },
                {
                    text:`Прогноз погоди по Азовському морю`,
                    style: 'bold',
                    alignment: 'center',
                    margin: [0,15,0,0]
                },
                {
                    text:`${reportInfo.AzovText}`,
                    alignment: 'center',
                    fontSize: 12,
                    margin: [0,15,0,0] 
                },
                {
                    text: "Прогноз погоди по Запорізькій області",
                    style: 'bold',
                    alignment: 'center',
                    margin: [0,13,0,0]
                },
                textWeatherCity,
                {
                    text: "Прогноз погоди по м. Запоріжжя",
                    style: 'bold',
                    alignment: 'center',
                    margin: [0,10,0,0]
                },
                textWeatherObl,
                {
                    text: 'Огляд погоди',
                    pageBreak: 'before',
                    alignment: 'center',
                    style: 'bold'
                },
                {
                    margin: [0,30,0,30],
                    width: 200,
                    text: `${weatherObservable[0].text}`,
                    alignment: 'center',
                },
                {
                    image:'public/assets/images/radiation_map.png',
                    width: 400,
                    margin: [47,0,0,50],
                },
                {
                    text: 'Кліматичні дані по м. Запоріжжя ',
                    style: 'bold',
                    alignment: 'center',
                },
                weatherObservable[0].StationWeather.map(item => {
                    const mapPosition = GetMapPosition(item.Station);
                    return [
                        {
                            text:`${item.MinTemperature}°`,
                            absolutePosition:mapPosition,
                            style: 'temperatureNight'
                        },
                        {
                            text:`${item.MaxTemperature}°`,
                            absolutePosition:{x: mapPosition.x, y: mapPosition.y+10},
                            style: 'temperatureDay'
                        },
                        {
                            text:`${item.Precipitation} mm`,
                            absolutePosition:{x: mapPosition.x+30, y: mapPosition.y+5},
                            style: 'precipitation'
                        }
                    ];
                }),
                {
                    margin: [0,5,0,0],
                    text: `Cередньодобова температура повітря за ${climateData[0].dayDate} ${climateData[0].dayMonth} – ${climateData[0].SrTemperature.value}°`
                },
                {
                    margin: [0,5,0,0],
                    text: `Максимальна температура повітря за ${climateData[0].dayDate} ${climateData[0].dayMonth} – ${climateData[0].MaxTemperature.value}° спостерігалась у ${climateData[0].MaxTemperature.date}р`
                },
                {
                    margin: [0,5,0,0],
                    text: `Мінімальна температура повітря за ${climateData[0].nigthDate} ${climateData[0].nigthMonth} – ${climateData[0].MinTemperature.value}° спостерігалась у ${climateData[0].MinTemperature.date}р`
                },
                {
                    stack: [
                         {
                             text: 'Начальник центру',
                             alignment: 'left'
                         },
                         {
                             text: 'І.Г.Черник',
                             alignment: 'right',
                             margin:[0,-14,0,0],
                         },
                     ],
                     margin: [0,20, 0 ,0]
                },
                {
                    text: `Бюлетень складений о ${climateData[0].time} годині ${climateData[0].date}`,
                    margin: [0,20,0,0]
                },
            ],
            styles: {
                bold:{
                    fontSize: 13,
                    bold: true
                },
                temperatureNight:{
                    fontSize:9,
                    color:'#0098d1'
                },
                temperatureDay:{
                    fontSize:9,
                    color:'#FF0000'
                },
                precipitation: {
                    fontSize: 9,
                    color:'#13a800'
                }
            }
        };

        if(climateData[0].StormText !== ""){
            pdfObject.content.splice(7, 0,  {
                text: 'Штормове попередження про найважливіші гідрометеорологічні явища ',
                alignment: 'center',
                style: 'bold',
                margin: [5,10,0,0],
            });
            pdfObject.content.splice(8, 0,{
                text: climateData[0].StormText,
                alignment: 'center',
                fontSize: 12,
            });
        }

        createPdfBinary(pdfObject, function(binary) {
            res.contentType('application/pdf');
            res.send(binary);
        });
    },
    GetStromWarning: async function (req, res) {
        const climateData = await ClimateData.Get().exec();
        const weatherInfo = await WeatherCityTable.GetAll().exec();

        const pdfObject = {
            pageSize: 'A4',
            pageMargins: [ 40, 10, 40, 60 ],
            content: [
                {
                    image:'public/assets/images/herb.jpg',
                    alignment: 'center'
                },
                {
                    text: 'ДЕРЖАВНА СЛУЖБА УКРАЇНИ З НАДЗВИЧАЙНИХ СИТУАЦІЙ',
                    style: 'bold',
                    fontSize: 11,
                    alignment: 'center',
                    margin: [0,20,0,0]
                },
                {
                    text: 'ЗАПОРІЗЬКИЙ ОБЛАСНИЙ ЦЕНТР З ГІДРОМЕТЕОРОЛОГІЇ',
                    style: 'bold',
                    fontSize: 13,
                    alignment: 'center'
                },
                {
                    text: '(ЗАПОРІЗЬКИЙ ЦГМ)',
                    style: 'bold',
                    alignment: 'center',
                    fontSize:10
                },
                {
                    text:'69095, м. Запоріжжя, пр. Соборний, 105,  тел/факс. (061) 787-62-06, 787-62-09',
                    alignment: 'center',
                    fontSize:8
                },
                {
                    text:'E-mail: pgdzaporozh@meteo.gov.ua, zcgm@ukr.net',
                    alignment: 'center',
                    fontSize:8
                },
                {
                    text: 'Штормове попередження про найважливіші гідрометеорологічні явища ',
                    alignment: 'center',
                    style: 'bold',
                    margin: [5,10,0,0],
                },
                {
                    text: climateData[0].StormText,
                    alignment: 'center',
                    fontSize: 12,
                },
                {
                    stack: [
                            {
                                text: 'Начальник центру',
                                alignment: 'left'
                            },
                            {
                                text: 'І.Г.Черник',
                                alignment: 'right',
                                margin:[0,-14,0,0],
                            },
                        ],
                        margin: [0,20, 0 ,0]
                },
            ],
            styles: {
                bold:{
                    fontSize: 13,
                    bold: true
                },
            }    
        };

        createPdfBinary(pdfObject, function(binary) {
            res.contentType('application/pdf');
            res.send(binary);
        });
    },
    UpdateEmail: async function (req, res) {
        
        await Email.ChangeRole(JSON.parse(req.body)).exec();
        res.end();
    }
}
