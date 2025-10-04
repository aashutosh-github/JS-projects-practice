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

  function startQuiz() {
    startButton.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestions();
  }

  function showQuestions() {
    questionText.textContent = questions[currentQuestionIndex].question;
    //clearing this so that the next question does not have the previous choices
    choicesList.innerHTML = "";
    for (const choice of questions[currentQuestionIndex].choices) {
      const li = document.createElement("li");
      li.innerText = `${choice}`;
      choicesList.appendChild(li);
    }
  }
});
