const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserController = require('../db/model/user');

const saltRounds = 10;


module.exports = {
    getToken: function(req, res){
        UserController.Authorization(req.body.login)
        .then(respons => {
            bcrypt.compare(req.body.password, respons.password).then(
                resp => {
                    resp ? res.status(200).json(respons): res.status(401).send();
                }
            );
        });       
    }
}