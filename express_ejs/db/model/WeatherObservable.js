var mongoose = require('mongoose');


const arrItem = mongoose.Schema({
    "Station": String,
    "MaxTemperature": String,
    "MinTemperature": String,
    "Precipitation": String,
    "Phenomen": String
});
const weatherObsSchema = mongoose.Schema({
    "dayDate": Number,
    "dayMonth": String,
    "nigthDate": Number,
    "nigthMonth": String,
    "year": String,
    "text": String,
    "StationWeather": [arrItem]
});

const WeatherObservable = mongoose.model('weather_observable', weatherObsSchema);

module.exports = {
    UnInit: function(){
        WeatherObservable.remove({}).then(res => {});
    },
    Init: function (data){
        const observ = new WeatherObservable(data);
        observ.save();
    },
    getAll: function () {
        return WeatherObservable.find({});
    },
    AddObservable: function (data) {
        const weatherObservable = new WeatherObservable(data);
        weatherObservable.save();
    },
    EditObservable: function (data) {
        WeatherObservable.findOneAndUpdate({},{$set:data}).then(res => {});
    }
}
