var mongoose = require('mongoose');
var Station = require('./Station');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const saltRounds = 10;

const userSchema = mongoose.Schema({
    "login": String,
    "password": String,
    "token": String,
    "role": Number,
    "stationID": String,
});

const User = mongoose.model('Users', userSchema);

module.exports = {
    Init:function(arr){
        
    },
    Authorization: function(login){
        return User.findOne({login:login});
    }
};