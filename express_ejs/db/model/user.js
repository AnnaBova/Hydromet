var mongoose = require('mongoose');
var Station = require('./Station');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const saltRounds = 10;

const userSchema = mongoose.Schema({
    "login": String,
    "role": Number,
    "password": String,
    "token": String,
    "stationID": String,
});

const User = mongoose.model('Users', userSchema);

module.exports = {
    Init:function(arr){
        var user = {}

        for(var i=0; i< arr.length; i++){
            var length = i;
            const PromisArr = [];
            PromisArr.push(i);
            PromisArr.push(bcrypt.hash(arr[i].password, saltRounds));
            PromisArr.push(JWT.sign({role: arr[i].role, login: arr[i].login}, 'hydromet'));
            if(arr[i].role == 1) { 
                PromisArr.push(Station.GetIdStation(arr[i].station));  
            }
            Promise.all(PromisArr)
                .then(res => {
                        user.login = arr[res[0]].login;
                        user.role = arr[res[0]].role;
                        user.password = res[1];
                        user.token = res[2];
                        if(arr[res[0]].role == 1){
                            user.stationID = res[3][0].id;
                        }else{
                            user.stationID = "";
                        }
                        const dbuser = new User(user);
                        dbuser.save();
                })
                .catch(err => console.log(err));
        }
    },
    Authorization: function(login){
        return User.findOne({login:login});
    },
};