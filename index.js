// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config()
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { parse } = require('dotenv');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

function dateIsValid(date) {
  return date instanceof Date && !isNaN(date);
}

app.get("/api" , function(req,res) {
  let timeStampMs = {
    "unix": new Date(Date.now()).getTime(),
    "utc": new Date(Date.now()).toUTCString()
  }

  res.json(timeStampMs)
})

app.get("/api/:date", function (req,res) {

  let timeStampMs = {
    "unix": null,
    "utc": null
  }

  if (req.params.date === '') {
    timeStampMs.unix = new Date.now()
    timeStampMs.utc = new Date.toUTCString()
  }

  if (dateIsValid(new Date(req.params.date))) {

    const date = new Date(req.params.date)
    timeStampMs.unix = parseInt(date.getTime())
    timeStampMs.utc = date.toUTCString()
    return res.json(timeStampMs)

  }

  const date = new Date(parseInt(req.params.date)).toUTCString()
  timeStampMs.unix = parseInt(req.params.date)
  timeStampMs.utc = date
  
  res.json(timeStampMs)
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
