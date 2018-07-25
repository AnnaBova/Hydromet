var mongoose = require('mongoose');
var TimeGaps = require('./TimeGaps');
var Station = require('./Station');

const WeatherTableSchema = mongoose.Schema({
    "date": String,
    "StationID": String,
    "TimeGapsId": String,
    "gap": String,
    "Weather": {
        "temperature": String,
        "wind": String,
        "pressure": String,
        "DirectionWind": String,
        "phenomena": String
    }
});

const WeatherTable = mongoose.model('WeatherTable', WeatherTableSchema);


module.exports = {
    UnInit: function(){
        WeatherTable.remove({}).then(res => {});
    },
    AddEntry: function(data){
        const entry = new WeatherTable(data);
        entry.save();
    },
    EditTables: function(data){
        return WeatherTable.findOneAndUpdate({ StationID: data.StationID, TimeGapsId: data.TimeGapsId }, data)
            // .then(res => {
            //
            // });
    },
    GetAll: function(){
       return WeatherTable.find({})
    },
    GetCityTable: function(id){
        return WeatherTable.find({StationID: id}).then(data => {
          data.sort((a, b)=>(a.gap - b.gap));
          return data;
        });;
    },
    GetZpWeather: function(observ, station){
        return WeatherTable.find({"StationID": station, "TimeGapsId": observ });
    },
    reset: function() {
        WeatherTable.remove({}, function(err){
        });
    }
};
