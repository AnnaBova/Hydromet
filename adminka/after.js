var path = require('path');
var ncp = require('ncp').ncp;
const fs = require('fs-extra');

ncp.limit = 16;

var srcPath = __dirname + '/build'; //current folder
var destPath = '../express_ejs/public/build'; //Any destination folder

fs.removeSync(destPath);

console.log('Copying files...');
ncp(srcPath, destPath, function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('Copying files complete.');
});