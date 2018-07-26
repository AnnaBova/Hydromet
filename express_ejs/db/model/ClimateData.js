var mongoose = require('mongoose');

const ClimateDataSchema = mongoose.Schema({
    "StormText": String,
    "day": String,
    "month":String,
    "year": String,
    "date": String,
    "time": Number,
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
