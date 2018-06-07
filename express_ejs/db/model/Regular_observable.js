var mongoose = require('mongoose');

const regular_observableSchema = mongoose.Schema({
    "date": String,
    "observ": String,
    "Title": String,
    "Position": String,
    "OutWater": String,
    "LvlWater": String,
    "EditLvl":String,
    "phenomena": String
});

const regular_observable = mongoose.model('regular_observal', regular_observableSchema);

module.exports = {
    Init: function(arr){
        for(var i=0; i < 9; i++){
            var obj = {
                "date": "24.11.2017р",
                "observ":"08",
                "Title": arr[i].title,
                "Position": arr[i].Position,
                "LvlWater": "",
                "OutWater": "",
                "EditLvl": "",
                "phenomena": ""

            }
            const observ = new regular_observable(obj);
            observ.save();
        }
    }, 
    GetAll: function(){
        return regular_observable.find({});
    }
}