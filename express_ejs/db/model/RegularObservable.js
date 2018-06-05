var mongoose = require('mongoose');

const regularObservSchema = mongoose.Schema({
    "date": String,
    "Observ": String,
    "NameStation": String,
    "OutWater": String,
    "LvlWater": String,
    "EditWater": String,
    "Phenomena": String,
})

const RegularObservable = mongoose.model('Regular_observable', regularObservSchema);


const c = new RegularObservable({
    date: '24.11.2017р',
    Observ:"08",
    NameStation: "Berda",
    OutWater:"400",
    LvlWater:"175",
    EditWater:"-3",
    Phenomena: "чисто"
});

module.exports = {
    AddObserv: function(data){
    },
    GetAllObserv: function(){
        RegularObservable.find({});
    }
}