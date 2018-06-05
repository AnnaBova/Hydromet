var mongoose = require('mongoose');

const hydrobulettinSchema = mongoose.Schema({
    "StormText": String,
    "WeatherCity": {
        "days":[{
            "title": String,
            "date": String,
            "day":{
                "weather": String,
                "temperature": String,
                "wind": String,
                "DiractionWind": String
            },
            "night":{
                "weather": String,
                "temperature": String,
                "wind": String,
                "DiractionWind": String
            }
        }]
    },
    "TextWeatherCity":{
        "days": [
            {
                "date": String,
                "text": String,
            }
        ]
    },
    "WeatherObl": {
        "days":[{
            "title": String,
            "date": String,
            "day":{
                "weather": String,
                "temperature": String,
                "wind": String,
                "DiractionWind": String
            },
            "night":{
                "weather": String,
                "temperature": String,
                "wind": String,
                "DiractionWind": String
            }
        }]
    },
    "TextWeatherObl":{
        "days": [
            {
                "date": String,
                "text": String,
            }
        ]
    }
});


const hydrobulettin = mongoose.model('Hydrometrologycal_bulletin', hydrobulettinSchema);

module.exports = {
    EditStormMessage: function(message){

    },
    EditZpWeather: function(table){

    },
    EditTextZpWeather: function (table){

    },
    EditOblWeather: function(table){

    },
    EditTextOblWeather: function(table){

    },
    GetAllInfo: function(){
        
    }
}