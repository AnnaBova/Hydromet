var mongoose = require('mongoose');

var ClimateSchema = mongoose.Schema({
    "1block": String,
    "2block": String,
    "3block": String,
    "4block": String,
    "5block": String,
    "6block": String,
    "7block": String
});

var ClimateCharacteristik = mongoose.model('climate_characteristic', ClimateSchema);

module.exports = {
    Init: function(arr){
        var obj = {
            "1block": arr[0],
            "2block": arr[1],
            "3block": arr[2],
            "4block": arr[3],
            "5block": arr[4],
            "6block": arr[5],
            "7block": arr[6]
        }
        const characteristic = new ClimateCharacteristik(obj);
        characteristic.save()
    },
    GetAll: function(){
        return ClimateCharacteristik.find({});
    },
    Edit: function(data){
        ClimateCharacteristik.findOneAndUpdate({}, data).then(res => {});
    }
}