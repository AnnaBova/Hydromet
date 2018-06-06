var mongoose = require('mongoose');
var TimeGaps = require('./model/TimeGaps');
var Station = require('./model/Station');
var WeatherTable = require('./model/CityWeatherTable');

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
    TimeGaps.Init(TimeGapsArray);
    Station.Init(StationArray);
    var object = {
        "date": "20.10.2017"
    }

    var weather = {
        "temperature": "",
        "wind":"",
        "pressure": "",
        "DirectionWind":"",
        "phenomena": ""
    }

    const StationArr = [];
    const TimeGapsArr = []; 
    for(var i=0; i<7; i++){ 
        StationArr.push(Station.GetIdStation(StationArray[i]['Title']));
    } 
    for(var j=0; j<8; j++){ 
        TimeGapsArr.push(TimeGaps.GetIdTimeGaps(TimeGapsArray[j]['Summer']));
    }
    Promise.all(StationArr).then(res => {
        Promise.all(TimeGapsArr).then(respons => {
             for(var i=0;i< res.length; i++){
                 object.StationID = res[i][0].id;
                 for(var j=0;j<respons.length; j++){
                    object.TimeGapsId = respons[j][0].id;
                    object.Weather = weather;
                    WeatherTable.AddEntry(object);
                 }
             }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));

    console.log('Initial');
}
