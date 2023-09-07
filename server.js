var fs = require('fs'),
    http = require('http'),
    https = require('https');
const express = require('express');
const serveIndex = require('serve-index');

var options = {
    key: fs.readFileSync('/etc/ssl/myserver.key'),
    cert: fs.readFileSync('/etc/ssl/star_zesco_co_zm.crt'),
};
var port = 3000;

const app = express();

var server = https.createServer(options, app).listen(port, function(){
    console.log("Express server listening on port " + port);
  });

app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

app.use('/request-type', (req, res, next) => {
  console.log('Request type: ', req.method);
  next();
});

app.use('/public', express.static('public'));
app.use('/public', serveIndex('public'));

app.get('/', (req, res) => {
  res.send('Successful response.');
});

//app.listen(4000,'0.0.0.0', () => console.log('Example app is listening on port 3000.'));