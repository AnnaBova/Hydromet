var mongoose = require('mongoose');

const ClimateDataSchema = mongoose.Schema({
    "StormText": String,
    "day": String,
    "mounth":String,
    "year": String,
    "DateBulletin":String,
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
    },
    number: Number
});


const ClimateData = mongoose.model('Climate_Data', ClimateDataSchema);

module.exports = {
    UnInit: function(){
        ClimateData.remove({}).then(res => {});
    },
    Init:function(data){
        const Climat = new ClimateData(data);
        Climat.save();
    },
    Get: function(){
        return ClimateData.find({});
    },
    EditClimateData: function(data){
        ClimateData.findOneAndUpdate({}, {$set: data}).then(res=>{})
    }
}
