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
    UnInit: function(){
        Events.remove({}).then(res => {});
    },
    Init: function(arr){
        for(var i=0;i<arr;i++){
            const event = new Events(arr[i]);
            event.save();
        }
    },
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
    GetEventOne: function(id){
        return Events.findById(id);
    },
    GetEvent(){
        return Events.find({});
    },
    UpdateEvent({file, title, Picture, text, date, description, _id}){
      return Events.findByIdAndUpdate(_id, {
        $set:{
          title,
          Text: text,
          date,
          description,
          Picture
        }
      });
    },
    UpdateEventNoImage({title, text, date, description, _id}){
      return Events.findByIdAndUpdate(_id, {
        $set:{
          title,
          Text: text,
          date,
          description
        }
      });
    },
    Delete(id){
        Events.findByIdAndRemove(id).then(res => {});
    }
}
