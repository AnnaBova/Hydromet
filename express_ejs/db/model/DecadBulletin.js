var mongoose = require('mongoose');

var DecadeSchema = mongoose.Schema({
    "Decad":String,
});

var DecadBulletin = mongoose.model('decade_bulletin', DecadeSchema);

module.exports = {
    AddBuletin: function(value) {
        const Bulletin = new DecadBulletin({"Decad":value});
        Bulletin.save(); 
    },
    Edit: function(value){
        DecadBulletin.findOneAndUpdate({}, {$set:{Decad: value}}).then(res => {});
    },
    GetBulletin: function() {
        return DecadBulletin.findOne({});
    }
}