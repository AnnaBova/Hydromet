var mongoose = require('mongoose');
var Station = require('./Station');

const WaterTemperatureSchema = mongoose.Schema({
    "Date": String,
    "Dnipro": {
        "Observable": String,
        "Temperature": String
    },
    "Azov": {
        "Observable": String,
        "Temperature": String
    }
});

const WaterTemperature = mongoose.model('WaterTemperature', WaterTemperatureSchema);

module.exports = {
    UnInit: function(){
        WaterTemperature.remove({}).then(res => {});
    },
    Init: function(data){
        const water = new WaterTemperature(data);
        water.save();
    },
    GetTemperature: function (){
        return WaterTemperature.findOne({});
    },
    AddTemperature: function(station, data, date, observ){
        Station.GetStationById(station)
            .then( res => {
                switch(res.Title){
                    case 'zaporozhye': {
                        WaterTemperature.findOneAndUpdate({}, { $set: { Dnipro:{ Observable: observ, Temperature: data} } })
                            .then(res => {
                            });
                        break;
                    }
                    case 'berdyansk':{
                        WaterTemperature.findOneAndUpdate({}, { $set: {Date:date, Azov:{ Observable: observ, Temperature: data} } })
                        .then(res => {
                        });
                        break;
                    }
                }
            })
            .catch(err => console.log(err));

    },
    UpdateTemperature: function(data){
      return WaterTemperature.findOneAndUpdate({}, data, { new: true });
    }
}
