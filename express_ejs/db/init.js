var mongoose = require('mongoose');
var TimeGaps = require('./model/TimeGaps');
var Station = require('./model/Station');
var WeatherTable = require('./model/CityWeatherTable');
var Regular_observable = require('./model/Regular_observable');
var UserController = require('./model/user');
var Chart = require('./model/Chart');

var chartArr = [{
    "label": "Пыль",
    "backgroundColor": "rgb(0, 255, 0)",
    "data": [13, 10, 5, 2, 20]
},
{
    "label": "Двооксид сірки",
    "backgroundColor": "rgb(255, 0, 68)",
    "data": [1.3, 10, 5, 2, 20]
},
{
    "label": "Оксид вуглецю",
    "backgroundColor": "rgb(0, 171, 255)",
    "data": [1.3, 10, 5, 2, 20, 30, 45]
},
{
    "label": "Двооксид азоту",
    "backgroundColor": "rgb(171, 0, 255)",
    "data": [1.3, 10, 5, 2, 20, 30, 45]
},
{
    "label": "Оксид азоту",
    "backgroundColor": "rgb(255, 247, 0)",
    "data": [1.3, 10, 5, 2, 20, 30, 45]
},
{
    "label": "Фенол",
    "backgroundColor": "rgb(255, 99, 132)",
    "data": [1.3, 10, 5, 2, 20, 30, 45]
},
{
    "label": "Хлористий водень",
    "backgroundColor": "rgb(152, 96, 0)",
    "data": [1.3, 10, 5, 2, 20, 30, 45]
},
{
    "label": "Фтористий водень",
    "backgroundColor": "rgb(230, 168, 42)",
    "data": [1.3, 10, 5, 2, 20, 30, 45]
},
{
    "label": "Формальдегід",
    "backgroundColor": "rgb(0, 7, 223)",
    "data": [1.3, 10, 5, 2, 20, 30, 45]
}]

var UsersArray = [
    {
        login: "vgzcgm",
        password: "oksana",
        role: "1",
        station: "zaporozhye"
    },
    {
        login: "prishib",
        password: "lintur",
        role: "1",
        station: "prism"
    },
    {
        login: "kirilovka",
        password: "gontar",
        role: "1",
        station: "kyrylivka"
    },
    {
        login: "melitopol",
        password: "valentina",
        role: "1",
        station: "melitopol"
    },
    {
        login: "gylyapole",
        password: "semenuta",
        role: "1",
        station: "gulyaypole"
    },
    {
        login: "botievo",
        password: "khistov",
        role: "1",
        station: "botievye"
    },
    {
        login: "berdyansk",
        password: "svetlana",
        role: "1",
        station: "berdyansk"
    },
    {
        login: "sappi",
        password: "martunenko",
        role: "2",
        
    },
    {
        login: "vgmz",
        password: "sorokina",
        role: "3",
    },
    {
        login: "sinoptik",
        password: "pogoda",
        role: "4",
    },
    {
        login: "klszps",
        password: "moskovka",
        role: "5",
    }
]

var ObservArr = [
    {
        title: "р. Берда",
        Position: "с. Осипенко"
    },
    {
        title: "р. Обитічна",
        Position: "м. Приморськ"
    },
    {
        title: "р. Лозуватка",
        Position: "с. Новоолексіївка"
    },
    {
        title: "р. Молочна",
        Position: "м. Токмак"
    },
    {
        title: "р. Молочна",
        Position: "с. Терпіння"
    },
    {
        title: "Дніпровське вдсх.",
        Position: "м. Запоріжжя - верхній б'єф"
    },
    {
        title: "Каховське вдсх.",
        Position: "с. Благовіщенка"
    },
    {
        title: "Каховське вдсх.",
        Position: "с. Плавні"
    },
    {
        title: "Каховське вдсх.",
        Position: "с. Розумівка"
    }
]

var StationArray = [
    {"Title":'zaporozhye'},
    {"Title":'prism'},
    {"Title":'kyrylivka'},
    {"Title":'gulyaypole'},
    {"Title":'botievye'},
    {"Title":'melitopol'},
    {"Title":'berdyansk'}
]

var TimeGapsArray = [
    {
        Summer: "00",
        Winter: "02"
    },
    {
        Summer: "03",
        Winter: "05"
    },
    {
        Summer: "06",
        Winter: "08"
    },
    {
        Summer: "09",
        Winter: "11"
    },
    {
        Summer: "12",
        Winter: "14"
    },
    {
        Summer: "15",
        Winter: "17"
    },
    {
        Summer: "18",
        Winter: "20"
    },
    {
        Summer: "21",
        Winter: "23"
    }
]

module.exports = function(){
    //TimeGaps.Init(TimeGapsArray);
    //Station.Init(StationArray);
    //UserController.Init(UsersArray);
    //Regular_observable.Init(ObservArr);

    //Chart.Init(chartArr);
    
    //var object = {
    //  "date": "20.10.2017"
    //}
    //var weather = {
    //    "temperature": "",
    //    "wind":"",
    //    "pressure": "",
    //    "DirectionWind":"",
    //    "phenomena": ""
    //}

    //const StationArr = [];
    //const TimeGapsArr = []; 
    //for(var i=0; i<7; i++){ 
    //    StationArr.push(Station.GetIdStation(StationArray[i]['Title']));
    //} 
    //for(var j=0; j<8; j++){ 
    //    TimeGapsArr.push(TimeGaps.GetIdTimeGaps(TimeGapsArray[j]['Summer']));
    //}
    //Promise.all(StationArr).then(res => {
    //    Promise.all(TimeGapsArr).then(respons => {
    //         for(var i=0;i< res.length; i++){
    //             object.StationID = res[i][0].id;
    //             for(var j=0;j<respons.length; j++){
    //                object.TimeGapsId = respons[j][0].id;
    //                object.Weather = weather;
    //               WeatherTable.AddEntry(object);
    //             }
    //         }
    //    })
    //    .catch(err => console.log(err));
    //})
    //.catch(err => console.log(err));

    console.log('Initial');
}
