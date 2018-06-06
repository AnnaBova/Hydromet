var mongoose = require('mongoose');


const days = mongoose.Schema({
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
});

const textdays = mongoose.Schema({
    "date": String,
    "text": String,
});
const hydrobulettinSchema = mongoose.Schema({
    "StormText": String,
    "WeatherCity": {
        "days":[days]
    },
    "TextWeatherCity":{
        "days": [textdays]
    },
    "WeatherObl": {
        "days":[days]
    },
    "TextWeatherObl":{
        "days": [textdays]
    },
});


const hydrobulettin = mongoose.model('Hydrometrologycal_bulletin', hydrobulettinSchema);

module.exports = {
    addBulettin: function(data){
        const bulettin = new hydrobulettin(data);
        bulettin.save();
    },
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
        return hydrobulettin.find({});
    }
}