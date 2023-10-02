
const quizData = [
  {
    question: "How can a datatype be declared to be a constant type in Javascript?",
    options: ["var", "let", "const", "constant"],
    correctAnswer: "const"
  },
  {
    question: "What keyword is used to check whether a given property is valid or not in Javascript?",
    options: ["in", "is in", "exists", "lies"],
    correctAnswer: "in"
  },
  {
    question: "Who developed Python Programming",
    options: ["Wick van Rossum", "Rasmus Lerdorf", "Guido van Rossum", "Niene Stom"],
    correctAnswer: "Guido van Rossum"
  },
  {
    question: "Which of the following is the correct extension of the python file?",
    options: [".python", ".pl", ".py", ".p"],
    correctAnswer: ".py"
  },
  
  {
    question: "which keyword is used for function in python language?",
    options: ["Function", "def", "Fun", "Define"],
    correctAnswer: "def",
    timeLimit: 10, // Set the time limit for this question (in seconds)
  },
];

let currentQuestion = 0;
let score = 0;
let timer;
const timeLimit = 10; // Default time limit for questions in seconds


function loadQuestion() {
  const questionContainer = document.getElementById("question-container");
  const question = quizData[currentQuestion].question;
  const options = quizData[currentQuestion].options;

  
  questionContainer.innerHTML = `
    <p id="question">Question ${currentQuestion + 1}: ${question}</p>
    <ul id="answers">
      <li><button onclick="checkAnswer('${options[0]}')">${options[0]}</button></li>
      <li><button onclick="checkAnswer('${options[1]}')">${options[1]}</button></li>
      <li><button onclick="checkAnswer('${options[2]}')">${options[2]}</button></li>
      <li><button onclick="checkAnswer('${options[3]}')">${options[3]}</button></li>
    </ul>
  `;

  
  clearInterval(timer);
  startTimer();
}


function startTimer() {
  let timeRemaining = quizData[currentQuestion].timeLimit || timeLimit;

  timer = setInterval(function () {
    timeRemaining--;
    if (timeRemaining >= 0) {
      document.getElementById("result").textContent = `Time remaining: ${timeRemaining}s`;
    } else {
      document.getElementById("result").textContent = "Time's up!";
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}


function checkAnswer(selectedOption) {
  const correctAnswer = quizData[currentQuestion].correctAnswer;
  const resultContainer = document.getElementById("result");

  if (selectedOption === correctAnswer) {
    resultContainer.textContent = "Correct!";
    score++;
  } else {
    resultContainer.textContent = "Incorrect!";
  }

 
  const answerButtons = document.querySelectorAll("#answers button");
  answerButtons.forEach(button => {
    button.disabled = true;
  });

  
  clearInterval(timer);

  
  document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
  const resultContainer = document.getElementById("result");

  
  resultContainer.textContent = "";
  const answerButtons = document.querySelectorAll("#answers button");
  answerButtons.forEach(button => {
    button.disabled = false;
  });

  
  document.getElementById("next-btn").style.display = "none";

  currentQuestion++;


  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    // Display the final score when the quiz is completed
    document.getElementById("question-container").innerHTML = `<p id="final-score">Your Final Score: ${score}/${quizData.length}</p>`;
    
 
    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart Quiz";
    restartButton.onclick = function() {
 
      currentQuestion = 0;
      score = 0;
      loadQuestion();
    };
    document.getElementById("question-container").appendChild(restartButton);
  }
}


loadQuestion();
