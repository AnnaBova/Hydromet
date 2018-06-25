var mongoose = require('mongoose');

var radiotionalScheme = mongoose.Schema({
    "Date": String,
    "Station": String,
    "value": String,
}); 

var radiotional = mongoose.model('radiotional', radiotionalScheme);

module.exports= {
    Init: function(arr){
        for(var i=0;i<arr.length;i++){
            const raio = new radiotional(arr[i]);
            raio.save();
        }
    },
    GetAll: function(){
        return radiotional.find({});
    },
    Edit: function(data){
        radiotional.findByIdAndUpdate(data._id, data).then(res => {});
    }
}