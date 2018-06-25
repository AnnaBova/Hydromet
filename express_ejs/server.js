'use strict';

const express = require('express');
const routes = require('./routes/index.js');
const port = process.env.PORT || 3001;
const engine = require('ejs-locals');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const db = require('./db/index');
const cors = require('cors');
const CityWeatherTable = require('./db/model/CityWeatherTable');
const Initital = require('./db/init');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(fileUpload());
app.use(cors());
app.use(cookieParser());
app.use('/public', express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use('/', routes);

app.listen(port, function () {
  setInterval(function(){
    var now = new Date();
    var hour = now.getHours();
    var minuts = now.getMinutes();
    var second = now.getSeconds();
    var mounth = now.getMonth();
    if(mounth >= 2 || mounth <= 10){
      if(hour == 0 && minuts == 0 && second == 0){
        CityWeatherTable.reset();
        Initital.InitCityWeatrherTable();
      }
    }else{
      if(hour == 2 && minuts == 0 && second == 0){
        CityWeatherTable.reset();
        Initital.InitCityWeatrherTable();
      }
    }
  }, 1000);
  console.log('Server listening on port ' + port + '...');
});