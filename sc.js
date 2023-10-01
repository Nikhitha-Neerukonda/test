// Define your quiz data
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Paris"
  },
  // Add more questions here
  {
    question: "What is the capital of India?",
    options: ["Paris", "Delhi", "Berlin", "Madrid"],
    correctAnswer: "Delhi",
    timeLimit: 10, // Set the time limit for this question (in seconds)
  },
];

let currentQuestion = 0;
let score = 0;
let timer;
const timeLimit = 10; // Default time limit for questions in seconds

// Function to load the current question
function loadQuestion() {
  const questionContainer = document.getElementById("question-container");
  const question = quizData[currentQuestion].question;
  const options = quizData[currentQuestion].options;

  // Dynamically insert question and answer options into the HTML
  // You can use a loop to create answer buttons

  // Example:
  questionContainer.innerHTML = `
    <p id="question">Question ${currentQuestion + 1}: ${question}</p>
    <ul id="answers">
      <li><button onclick="checkAnswer('${options[0]}')">${options[0]}</button></li>
      <li><button onclick="checkAnswer('${options[1]}')">${options[1]}</button></li>
      <li><button onclick="checkAnswer('${options[2]}')">${options[2]}</button></li>
      <li><button onclick="checkAnswer('${options[3]}')">${options[3]}</button></li>
    </ul>
  `;

  // Reset timer
  clearInterval(timer);
  startTimer();
}

// Function to start the timer
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

// Function to check the selected answer
function checkAnswer(selectedOption) {
  const correctAnswer = quizData[currentQuestion].correctAnswer;
  const resultContainer = document.getElementById("result");

  if (selectedOption === correctAnswer) {
    resultContainer.textContent = "Correct!";
    score++;
  } else {
    resultContainer.textContent = "Incorrect!";
  }

  // Disable answer buttons after selection
  const answerButtons = document.querySelectorAll("#answers button");
  answerButtons.forEach(button => {
    button.disabled = true;
  });

  // Stop the timer
  clearInterval(timer);

  // Show the next button
  document.getElementById("next-btn").style.display = "block";
}

// Function to move to the next question
function nextQuestion() {
  const resultContainer = document.getElementById("result");

  // Clear previous result and enable answer buttons
  resultContainer.textContent = "";
  const answerButtons = document.querySelectorAll("#answers button");
  answerButtons.forEach(button => {
    button.disabled = false;
  });

  // Hide the next button until the next question is loaded
  document.getElementById("next-btn").style.display = "none";

  currentQuestion++;

  // Check if the quiz is completed
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    // Display the final score when the quiz is completed
    document.getElementById("question-container").innerHTML = `<p id="final-score">Your Final Score: ${score}/${quizData.length}</p>`;
    
    // Show restart button
    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart Quiz";
    restartButton.onclick = function() {
      // Reset variables and load the first question
      currentQuestion = 0;
      score = 0;
      loadQuestion();
    };
    document.getElementById("question-container").appendChild(restartButton);
  }
}

// Initial load
loadQuestion();
