var mongoose = require('mongoose');

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
    Init: function(data){
        const water = new WaterTemperature(data);
        water.save();
    },
    GetTemperature: function (){
        return WaterTemperature.find({});
    }
}