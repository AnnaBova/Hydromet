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
    Init: function(data) {
        const weather = new WeatherCity(data);
        weather.save();
    },
    GetAll: function(){
        return WeatherCity.find({});
    }   
}