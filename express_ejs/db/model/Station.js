var mongoose = require('mongoose');

const StationSchema = mongoose.Schema({
    "Title":String,
    "addres": String,
    "email": String,
    "full_name": String,
    "photo": Number,
});

const Station = mongoose.model('Stations', StationSchema);

module.exports = {
    UnInit: function(){
        Station.remove({}).then(res => {});
    },
    Init: function(array){
        for(var i=0; i< array.length; i++){
            const station = new Station(array[i]);
            station.save();
        }
    },
    GetIdStation: function(string){
        return Station.find({'Title': string});
    },
    GetStationById: function(id){
        return Station.findById(id);
    },
    AddPhoto: function(station){
        Station.findOneAndUpdate({Title: station}, {$inc:{ quantity: -2, photo: 1 }}).then(res => {
            
        });
    }
}