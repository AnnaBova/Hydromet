var mongoose = require('mongoose');
var Init = require('./db/init').Init,
    UnInit = require('./db/init').UnInit;
mongoose.connect('mongodb://localhost/Hydromet');

var flag = process.argv[2];



if(flag == 'init'){
    const db = mongoose.connection;
    
    db.on('error', err => {
        console.log('error', err)
    })
    
    
    db.once('open', () => {
        console.log('we are connected')
        Init();
    })
}
if(flag == 'remove'){
    UnInit();
}








