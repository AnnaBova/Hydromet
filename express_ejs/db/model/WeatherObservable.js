var mongoose = require('mongoose');

const weatherObsSchema = mongoose.Schema({
    "day": Number,
    "mounth": String,
    "year": String,
    "text": String
});

const WeatherObservable = mongoose.model('weather_observable', weatherObsSchema);

module.exports = {
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