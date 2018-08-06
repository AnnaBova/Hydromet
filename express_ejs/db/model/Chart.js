var mongoose = require('mongoose');

const ChartSchema = mongoose.Schema({
    "label": String,
    "backgroundColor": String,
    "data": [Number],
    "mounth": String,
    "year": String,
});

const Chart = mongoose.model('Chart', ChartSchema);

module.exports = {
    UnInit: function(){
        Chart.remove({}).then(res => {})
    },
    Init: function(array){
        for(var i=0; i< array.length; i++){
            const chart = new Chart(array[i]);
            chart.save();
        }
    },
    GetAll: function () {
        return Chart.find({});
    },
    Edit: function (value){
        Chart.findByIdAndUpdate(value._id, value).then(res=> {})
    }
}