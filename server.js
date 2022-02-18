var aladdinGarageDoor = require('node-aladdin-connect-garage-door');
var allowDebug = true;
var deviceNumber = 0;
var garageNumber = 1;
var express = require("express") 
var app = express();
var username = "chase.c.cargill@gmail.com";
var password = "";


app.listen(3000, () => {
  console.log("Listening on 3000")
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

