var mongoose = require('mongoose');

const textdays = mongoose.Schema({
    "date": String,
    "text": String,
});

const ReportSchema = mongoose.Schema({
    "AzovText": String,
    "TextWeather": [textdays] 
});

const Report = mongoose.model('Report', ReportSchema);

module.exports = {
    Init: function(object){
        const report = new Report(object)
        report.save()
    },
    UnInit: function() {
        Report.remove({}).then(res => {})
    },
    Get: function() {
        return Report.findOne({});
    },
    Update: function(object){
        return Report.findOneAndUpdate({}, object)
    }
}