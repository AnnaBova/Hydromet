var mongoose = require('mongoose');

const StationSchema = mongoose.Schema({
    "Title":String
});

const Station = mongoose.model('Stations', StationSchema);

module.exports = {
    Init: function(array){
        for(var i=0; i< array.length; i++){
            const station = new Station(array[i]);
            station.save();
        }
    },
    GetIdStation: function(string, callback){
        return Station.find({'Title': string});
    },
    GetStationById: function(id){
        return Station.findById(id);
    }
}