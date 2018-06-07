var mongoose = require('mongoose');

const ClimateDataSchema = mongoose.Schema({
    "StormText": String,
    "day": String,
    "mounth":String,
    "year": String,
    "SrTemperature": {
        "date":String,
        "value":String
    },
    "MaxTemperature": {
        "date":String,
        "value":String 
    },
    "MinTemperature": {
        "date":String,
        "value":String 
    }
});


const ClimateData = mongoose.model('Climate_Data', ClimateDataSchema);

module.exports = {
    Init:function(data){
        const Climat = new ClimateData(data);
        Climat.save();
    },
    Get: function(){
        return ClimateData.find({});
    }
}