var mongoose = require('mongoose');

const days = mongoose.Schema({
    "title": String,
    "date": String,
    "day":{
        "weather": String,
        "temperature": String,
        "wind": String,
        "DirectionWind": String
    },
    "night":{
        "weather": String,
        "temperature": String,
        "wind": String,
        "DirectionWind": String
    }
});

const textdays = mongoose.Schema({
    "date": String,
    "text": String,
});

const WeatherCitySchema = mongoose.Schema({
    WeatherTable: [days],
    TextWeather: [textdays],
});

const WeatherCity = mongoose.model('weather_city', WeatherCitySchema);

module.exports = {
    UnInit: function(){
        WeatherCity.remove({}).then(res => {});
    },
    Init: function(arr) {
        for(var i=0; i< arr.length; i++){
            const weather = new WeatherCity(arr[i]);
            weather.save();
        }
    },
    GetAll: function(){
        return WeatherCity.find({});
    },
    EditTableCityRowById: function(body){
        WeatherCity.find({})
        .then(res => {
            WeatherCity.findByIdAndUpdate(res[1]._id, {$set: { WeatherTable: body }})
            .then(resp => {
            });
        })
    },
    EditTableOblRowById: function (body) {
        WeatherCity.find({})
        .then(res => {
            WeatherCity.findByIdAndUpdate(res[0]._id, {$set: { WeatherTable: body }})
            .then(resp => {
            });
        })
    },
    EditTextCityRowById: function(body){
        WeatherCity.find({})
        .then(res => {
            WeatherCity.findByIdAndUpdate(res[1]._id, {$set: { TextWeather: body }})
            .then(resp => {
            });
        })
    },
    EditTextOblRowById: function(body){
        WeatherCity.find({})
        .then(res => {
            WeatherCity.findByIdAndUpdate(res[0]._id, { $set: { TextWeather: body }})
            .then(resp => {
            });
        })
    }   
}