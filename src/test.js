var questions;
var answers;
var question;
var i = 0;

$.ajax({
  url: "/questions",
  dataType: "json",
}).done(function (response) {
  questions = response["test1_questions"]
  answers = questions[i]["answers"];
  question = questions[i]["question"];
  askQuestion(question, answers);
  });

function submitAnswer(event) {
  event.preventDefault();

  // Record answer
  let checkedInput = document.querySelector('input[name="answer"]:checked');
  if (!checkedInput) return;
  let answer = checkedInput.value;
  sessionStorage.setItem(i, answer);
  
  i++;
  //submit test if at end of questions
  if (questions.length === i) {
    // Show submit screen
    location.href = "/submit";
    return;
  }

  // Ask next question
  question = questions[i]["question"];
  answers = questions[i]["answers"];
  askQuestion(question, answers);
};
    
function askQuestion(question, answers) {
  //add the question
  questionDiv.textContent = question;
  //add the answers
  const letters = ["A", "B", "C", "D"];
  const answersHtml = answers.map((answer, i) => {
    return `
      <input type="radio" name="answer" value=${letters[i]}>  ${answer}<br>
    `;
  }).join(""); 
  answersDiv.innerHTML = answersHtml;
}
const answersDiv = document.querySelector('#answers');
const questionDiv = document.querySelector('#question')

// Set the form to trigger submitAnswer on submit
var questionForm = document.querySelector('#question-form');
questionForm.onsubmit = submitAnswer;

// Count down 1 minute and end test 
var nowPlusOneMin = new Date().getTime() + 60000;
var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = nowPlusOneMin - now;
  
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  document.getElementById("timer").innerHTML = "Time Remaining: " + minutes + "m " + seconds + "s ";
  //when countdown is finished, display "EXPIRED", and send client to '/submit'
  if (distance <= 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "EXPIRED";
    location.href = "/submit";
    //TODO: disable history, so client cannot press back button to go back to the test
  }
}, 1000);
