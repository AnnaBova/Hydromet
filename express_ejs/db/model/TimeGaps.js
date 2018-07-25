var mongoose = require('mongoose');

const TimeGapsSchema = mongoose.Schema({
    "Summer": String,
    "Winter": String
});

const TimeGaps = mongoose.model('TimeGaps', TimeGapsSchema);

module.exports = {
    UnInit: function(){
        TimeGaps.remove({}).then(res => {});
    },
    Init: function(array){
        for(let i=0; i< array.length; i++){
            const timeGaps = new TimeGaps(array[i]);
            timeGaps.save();
        }
    },
    GetIdTimeGaps: function(string){
       return TimeGaps.find({$or: [{'Summer': string}, {'Winter': string}]})
    },
    GetAllTimeGaps: function(){
       return TimeGaps.find({})
    },
    GetTimeById: function(id){
        return TimeGaps.findById(id);
    }
}
