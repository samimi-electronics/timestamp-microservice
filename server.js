// server.js
// where your node app starts

// init project
const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204


app.use(express.static('public'));
app.use(express.urlencoded())

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp/:dateString', (req, res) => {
  const dateString = req.params.dateString;
  // Check if parameter is number
  if(/^\d+$/g.test(dateString)){
    const time = parseInt(dateString, 10);
    // if integer is below 1 return error
    if (time < 1)
      return res.status(400).json({error: 'Invalid Date'})
    return res.json({
      unix: time,
      utc: new Date(time).toUTCString()
    })
  }
  // Check if date is ISO 8601 format
  if (!isNaN(Date.parse(dateString))) {
    const date = new Date(dateString)
    return res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    })
  }
  return res.status(400).json({error: 'Invalid Date'})
})

app.get('/api/timestamp/', (req, res) => {
  const date = new Date()
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  })
})



// listen for requests :)
const listener = app.listen(/*process.env.PORT*/PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});