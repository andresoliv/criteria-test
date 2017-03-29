const express = require('express');
const app = express();
const path = require('path');
const testData = require('../src/database.js');

app.use(express.static(path.join(__dirname, '../src')));
app.use(function(req, res, next) {
  res.setHeader('Content-Type', 'text/html')
  next();
});

app.get( '/', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/start.html'));
})

app.get( '/test', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/test.html'));
})

app.get( '/submit', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/submit.html'));
})

app.get('/questions', function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(testData);
})

const port = 3000;
app.listen(process.env.PORT || port, () => {
  console.log("listening on", port);
});
