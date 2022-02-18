var aladdinGarageDoor = require('node-aladdin-connect-garage-door');
var express = require("express") 
var morgan = require('morgan');
var https = require('https');
var rfs = require('rotating-file-stream');
var fs = require('fs');
const port = 3000;


var allowDebug = false;
var deviceNumber = 0;
var garageNumber = 1;
var key = fs.readFileSync(__dirname + '/../certs/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/../certs/selfsigned.crt')
var options = {
  key: key,
  cert: cert
};


var username = `${username}`;
var password = `${password}`;

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
});

app.get("/close", (req, res, next) => {
  aladdinGarageDoor(username, password, "close", callback, deviceNumber, garageNumber, allowDebug);  
});

app.get("/status", (req, res, next) => {
  aladdinGarageDoor(username, password, "status", callback, deviceNumber, garageNumber, allowDebug);  
});


function callback(text)  {
  console.log(text);
}

