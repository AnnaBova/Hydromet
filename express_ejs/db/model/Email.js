var mongoose = require('mongoose');


var EmailSchema = mongoose.Schema({
    "Email": String,
    "role": Number
});

var Email = mongoose.model('email', EmailSchema);

module.exports = {
    GetAll: function(){
        return Email.find({});
    },
    Init: function(arr){
        for(var i=0;i<arr.length; i++){
            const email = new Email(arr[i]);
            email.save();
        }
    },
    Add: function(data){
        const email = new Email(data);
        return email.save()
    },
    Delete: function(data){
        data = JSON.parse(data);
        return Email.findOneAndRemove({_id: data._id}).then(res => {});
    }
}