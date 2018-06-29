var mongoose = require('mongoose');

var DangerObservSchema = mongoose.Schema({
    "text": String
});

var DangerGydrolygy = mongoose.model('dager_gydrolygy', DangerObservSchema);

module.exports = {
    UnInit: function(){
        DangerGydrolygy.remove({}).then(res => {});
    },
    Init: function(data){
        const danger = new DangerGydrolygy(data);
        danger.save();
    },
    GetAll: function(){
        return DangerGydrolygy.find({});
    },
    Edit: function(data){
        return DangerGydrolygy.findOneAndUpdate({}, data).then(res => {});
    }
}