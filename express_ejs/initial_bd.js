var mongoose = require('mongoose');
var Init = require('./db/init').Init;
mongoose.connect('mongodb://localhost/Hydromet');

const db = mongoose.connection;

db.on('error', err => {
    console.log('error', err)
})


db.once('open', () => {
    Init();
    console.log('we are connected')
})






