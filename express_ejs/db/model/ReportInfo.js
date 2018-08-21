var mongoose = require('mongoose');

const ReportSchema = mongoose.Schema({
    "AzovText": String,
    "TextWeather": String 
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