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
  console.log('Server listening on port ' + port + '...');
});