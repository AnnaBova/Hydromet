var mongoose = require('mongoose');

const item = mongoose.Schema({
    "date": String,
    "value": String,
    "post": String
});

const ClimateRecordsSchema = mongoose.Schema({
    "id": Number,
    "modalTitle": String,
    "date": String,
    "value": String,
    "post": String,
    "table": [ item ]
});

const ClimateRecords = mongoose.model('Climate_Records', ClimateRecordsSchema);

module.exports = {
    AddRecord: function(data){
        const record = new ClimateRecords(data);
        record.save();
    },
    EditRecord: function(){

    },
    getAllRecords: function(){
        return ClimateRecords.find({});
    }, 
    UpdateRecords: function(record){
        ClimateRecords.findByIdAndUpdate(record._id, record)
            .then(res => {
            });
    }
}