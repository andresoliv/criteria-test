const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const testData = require('../src/database.js');

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 
app.use(express.static(path.join(__dirname, '../src')));
app.use(express.static(path.join(__dirname, '../')));
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

app.post('/score', function (req, res) {
  const answers = req.body;
  const questions = testData["test1_questions"];
  const questionsLength = questions.length;
  let totalCorrect = 0;
  
  for (let i = 0; i < questionsLength; ++i) {
    correctAnswer = questions[i]["correctAnswer"];
    if (correctAnswer === answers[i]) totalCorrect++;
  }

  let result = (totalCorrect / questionsLength) * 100;
  res.send({ "score": result});
})

app.get('/questions', function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(testData);
})

const port = 3000;
app.listen(process.env.PORT || port, () => {
  console.log("listening on", port);
});
