var aladdinGarageDoor = require('node-aladdin-connect-garage-door');
var express = require("express") 
var morgan = require('morgan');
var https = require('https');
var path = require('path');
require('dotenv').config();
var rfs = require('rotating-file-stream');
var fs = require('fs');
const port = 3000;


var allowDebug = false;
var deviceNumber = 0;
var garageNumber = 1;
var key = fs.readFileSync('/etc/letsencrypt/live/home.chasecargill.com/privkey.pem', 'utf8');
var cert = fs.readFileSync('/etc/letsencrypt/live/home.chasecargill.com/cert.pem', 'utf-8');
var ca = fs.readFileSync('/etc/letsencrypt/live/home.chasecargill.com/chain.pem', 'utf-8')

var options = {
  key: key,
  cert: cert,
  ca: ca
};


var username = process.env.USERNAME;
var password = process.env.PASSWORD;

var accessLogStream = rfs.createStream('access.log', {
  interval: '7d', // rotate every 7 days to
  path: path.join(__dirname, 'log')
})

var app = express();

// setup logger
app.use(morgan('combined', { stream: accessLogStream }))

var server = https.createServer(options, app);
server.listen(port, () => {
  console.log("Server listening on: " + port);
})

app.get("/open", (req, res, next) => {
  aladdinGarageDoor(username, password, "open", callback, deviceNumber, garageNumber, allowDebug);  
  console.log("Username: " + username);
  console.log("Password: " + password);
  res.send("Open command received!")
});

app.get("/close", (req, res, next) => {
  aladdinGarageDoor(username, password, "close", callback, deviceNumber, garageNumber, allowDebug);  
  console.log("Username: " + username);
  console.log("Password: " + password);
  res.send("Close command received!")
});

app.get("/status", (req, res, next) => {
  aladdinGarageDoor(username, password, "status", callback, deviceNumber, garageNumber, allowDebug);  
  console.log("Username: " + username);
  console.log("Password: " + password);
  res.send("Status check");
});


function callback(text)  {
  console.log(text);
}

