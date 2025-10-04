document.addEventListener("DOMContentLoaded", () => {
  const questionContainer = document.querySelector("#question-container");
  const questionText = document.querySelector("#question-text");
  const choicesList = document.querySelector("#choices-list");
  const nextButton = document.querySelector("#next-btn");
  const resultContainer = document.querySelector("#result-container");
  const scoreDisplay = document.querySelector("#score");
  const restartButton = document.querySelector("#restart-btn");
  const startButton = document.querySelector("#start-btn");

  let currentQuestionIndex = 0;
  let score = 0;

  const questions = [
    {
      question: "What is the capital of France ?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet ?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who wrote Hamlet ?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
  ];

  startButton.addEventListener("click", startQuiz);

  nextButton.addEventListener("click", showNextQuestion);

  restartButton.addEventListener("click", restartQuiz);

  function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestions();
    } else {
      showResult();
    }
  }

  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} out of ${questions.length}`;
  }

  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    startQuiz();
  }

  function startQuiz() {
    startButton.classList.add("hidden");
    nextButton.classList.remove("hidden");
    questionContainer.classList.remove("hidden");
    showQuestions();
  }

  function showQuestions() {
    questionText.textContent = questions[currentQuestionIndex].question;
    //clearing this so that the next question does not have the previous choices
    choicesList.innerHTML = "";
    for (const choice of questions[currentQuestionIndex].choices) {
      const li = document.createElement("li");
      li.classList.add("hover");
      li.textContent = choice;
      //using the callback here because we cannot directly use the () after the function otherwise it
      //will run immediately, so defining an anonymous function that internally calls the function with
      //the provided argument
      li.addEventListener("click", (event) => {
        selectAnswer(choice);
        event.target.classList.add("selected");
        event.target.classList.remove("hover");
      });

      choicesList.appendChild(li);
    }
  }

  function selectAnswer(choice) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (choice === correctAnswer) {
      score++;
    }
    nextButton.classList.remove("hidden");
  }
});
