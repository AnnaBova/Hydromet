var mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    "title": String,
    "date": String,
    "Picture": String,
    "description": String,
    "Text": String,
});

const Events = mongoose.model('events', EventSchema);

module.exports = {
    AddEvent: function (value) {
        const event = new Events(value);
        event.save();
    },
    GetAll: function (params, perPage) {
        var page = params || 1;
        var answer = []
        answer.push(Events.find({})
            .skip((perPage * page) - perPage)
            .limit(perPage));
        answer.push(Events.count());
        return answer;
    },
    GetEvent: function(id){
        return Events.findById(id);
    },
    GetEvent(){
        return Events.find({});
    },
    Delete(id){
        console.log(id);
        Events.findByIdAndRemove(id).then(res => {});
    }
}