var mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    "login": String,
    "password": String,
    "token": String,
    "role": Number,
});

const User = mongoose.model('Users', userSchema);

module.exports = {
    Authorization: function(login){
        return User.findOne({login:login});
    }
};