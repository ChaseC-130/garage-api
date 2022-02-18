var aladdinGarageDoor = require('node-aladdin-connect-garage-door');
var express = require("express") 
var morgan = require('morgan');
var https = require('https');
var path = require('path');
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

const args = process.argv;

var username = args[2];
var password = args[3];
var confirmedToken = args[4];

var accessLogStream = rfs.createStream('access.log', {
  interval: '7d', // rotate every 7 days to
  path: path.join(__dirname, 'log')
})

var app = express();

// setup logger
app.use(morgan('combined', { stream: accessLogStream }))
app.use(express.json());

var server = https.createServer(options, app);
server.listen(port, () => {
  console.log("Server listening on: " + port);
})

app.post("/open", function (req, res) {

  const { token } = req.body;

  if (token === confirmedToken) {
    aladdinGarageDoor(username, password, "open", callback, deviceNumber, garageNumber, allowDebug);  
    res.send("Open command received!")
  } else {
    res.send("Invalid authentication token received")
  }
});

app.post("/close", function (req, res) {
  
  const {token} = req.body;

  if (token === confirmedToken) {
    aladdinGarageDoor(username, password, "close", callback, deviceNumber, garageNumber, allowDebug);  
    res.send("Close command received!")
} else {
  res.send("Invalid authentication token received")
  }
});

app.post("/status", function (req, res) {

  
  const {token} = req.body;

  if (token === confirmedToken) {
    aladdinGarageDoor(username, password, "status", callback, deviceNumber, garageNumber, allowDebug);  
    res.send("Status check");
  } else {
    res.send("Invalid authentication token received")
  }
});


function callback(text)  {
  console.log(text);
}

