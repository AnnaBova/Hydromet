var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Hydromet');

const db = mongoose.connection;

db.on('error', err => {
    console.log('error', err)
});


db.once('open', () => {
    console.log('we are connected')
});

module.exports = db;
