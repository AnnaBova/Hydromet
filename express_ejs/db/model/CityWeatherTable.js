var mongoose = require('mongoose');
var TimeGaps = require('./TimeGaps');
var Station = require('./Station');

const WeatherTableSchema = mongoose.Schema({
    "date": String,
    "StationID": String,
    "TimeGapsId": String,
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
    AddEntry: function(data){
        const entry = new WeatherTable(data);
        entry.save(); 
    },
    EditTables: function(data){
        WeatherTable.findOneAndUpdate({ StationID: data.StationID, TimeGapsId: data.TimaGapsId }, data)
            .then(res => {
                
            });
    },
    GetAll: function(){
       return WeatherTable.find({});
    },
    GetCityTable: function(id){
        return WeatherTable.find({StationID: id});
    },
    GetZpWeather: function(observ, station){
        return WeatherTable.find({"StationID": station, "TimeGapsId": observ });
    },
    reset: function() {
        WeatherTable.remove({}, function(err){
        });
    }
};