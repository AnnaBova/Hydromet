var mongoose = require('mongoose');

const item = new mongoose.Schema({
    "date": String,
    "value": String,
    "post": String
});

const meteorologPhenomenaSchema = mongoose.Schema({
    "id": Number,
    "modalName": String,
    "modalConvention": String,
    "table": [ item ]
})


const meteorologPhenomena = mongoose.model('meteorolog_phenomena', meteorologPhenomenaSchema);

module.exports = {
    UnInit: function(){
        meteorologPhenomena.remove({}).then(res => {});
    },
    Init: function(arr){
        for(var i=0;i< arr.length; i++){
            const phenomen = new meteorologPhenomena(arr[i]);
            phenomen.save();
        }
    },
    AddPhenomena: function(data){
        const phenomena = new meteorologPhenomena(data);
        phenomena.save();
    },
    UpdateRecords: function(phenomen){
        meteorologPhenomena.findByIdAndUpdate(phenomen._id, phenomen)
            .then(res => {
            });
    },
    GetAllPhenomena: function(){
       return  meteorologPhenomena.find({});
    }
}