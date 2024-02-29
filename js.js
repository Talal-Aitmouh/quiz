const questionDiv = document.getElementById('question');
const resultDiv = document.getElementById('result');
const companies = ["bmw", "cherry", 'opel', 'peugeot' , "porsche", 'toyota'];
const choices = document.querySelector('.choices');

let currentQuestion = -1; // Start from -1 to begin with
let rightAnswers = 0;
let wrongAnswers = 0;
let totalQuestions = companies.length;
let timeoutID; // Variable to hold the timeout ID

const displayNextQuestion = function() {
  currentQuestion++;
  if (currentQuestion < companies.length) {
    const question = `Question: Where is the ${companies[currentQuestion]} logo?`;
    questionDiv.textContent = question;
    // Remove 'correct' and 'incorrect' classes after 200ms
    if (timeoutID) {
      clearTimeout(timeoutID); // Clear previous timeout if exists
    }
    const companyElements = document.querySelectorAll('.company');
    companyElements.forEach(company => {
      company.classList.remove('correct', 'incorrect');
    });
    timeoutID = setTimeout(() => {
      clearTimeout(timeoutID); // Clear timeout after 200ms
    }, 500);
  } else {
    const accuracy = ((rightAnswers / totalQuestions) * 100).toFixed(2); // Calculate accuracy and round to 2 decimal places
    resultDiv.textContent = `Your score is: ${rightAnswers}/${totalQuestions} - You answered right: ${rightAnswers}, wrong: ${wrongAnswers}, accuracy: ${accuracy}%`;
    resultDiv.style.display = 'block'; // Show the result
  }
}

choices.addEventListener('click', function(e) {
  const selectedCompany = e.target;
  const selectedCompanyClass = selectedCompany.classList[0]; // Get the first class in case there are multiple
  
  if (currentQuestion >= 0 && currentQuestion < companies.length) {
    const currentAnswer = companies[currentQuestion];

    if (currentAnswer === selectedCompanyClass) {
      selectedCompany.classList.add('correct');
      rightAnswers++;

      // Remove 'correct' class after 500ms
      setTimeout(() => {
        selectedCompany.classList.remove('correct');
      }, 500);
    } else {
      selectedCompany.classList.add('incorrect');
      wrongAnswers++;

      // Remove 'incorrect' class after 500ms
      setTimeout(() => {
        selectedCompany.classList.remove('incorrect');
      }, 500);
    }
  }
  
  displayNextQuestion();
});


document.querySelector('.model_btn').addEventListener('click',function(){
  const model = document.querySelector('.model')
  const btn = document.querySelector('.model_btn')
  model.style.display = "none"
  btn.style.display = "none"
  displayNextQuestion();
})