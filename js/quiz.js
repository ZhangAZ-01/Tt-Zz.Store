const quizCard = document.getElementById("quiz-card");
let quizProgress = document.getElementById("quiz-progress");
let quizQuestion = document.getElementById("quiz-question");
let quizOptions = document.getElementById("quiz-options");

let currentIndex = 0;
let score = 0;

const renderProgress = () => {
  quizProgress.innerHTML = "";

  QUIZ.forEach((_, index) => {
    const step = document.createElement("span");
    if (index < currentIndex) step.classList.add("done");
    if (index === currentIndex) step.classList.add("active");
    quizProgress.appendChild(step);
  });
};

const renderQuestion = () => {
  renderProgress();
  quizQuestion.textContent = QUIZ[currentIndex].question;
  quizOptions.innerHTML = "";

  QUIZ[currentIndex].options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = `${index + 1}. ${option}`;
    button.addEventListener("click", () => selectAnswer(index, button));
    quizOptions.appendChild(button);
  });
};

const selectAnswer = (selectedIndex, selectedButton) => {
  const buttons = Array.from(quizOptions.children);
  buttons.forEach((button) => {
    button.disabled = true;
  });

  const correctIndex = QUIZ[currentIndex].answer;

  if (selectedIndex === correctIndex) {
    selectedButton.classList.add("correct");
    score += 1;
  } else {
    selectedButton.classList.add("wrong");
    buttons[correctIndex].classList.add("correct");
  }

  currentIndex += 1;
  setTimeout(renderNext, 550);
};

const renderNext = () => {
  if (currentIndex < QUIZ.length) {
    renderQuestion();
  } else {
    renderResult();
  }
};

const renderResult = () => {
  quizCard.innerHTML = "";

  const result = document.createElement("div");
  result.className = "result-card";

  const emoji = document.createElement("p");
  emoji.className = "result-emoji";
  emoji.textContent = score === QUIZ.length ? "🎉" : score >= 3 ? "💗" : "🍬";

  const title = document.createElement("h2");
  title.textContent = score === QUIZ.length ? "全部答对了！" : score >= 3 ? "已经很懂我了！" : "再玩一次会更懂我！";

  const scoreText = document.createElement("p");
  scoreText.className = "score";
  scoreText.textContent = `${score} / ${QUIZ.length}`;

  const message = document.createElement("p");
  message.className = "muted";
  message.textContent =
    score === QUIZ.length
      ? "今天也要一直站在我这边。"
      : score >= 3
        ? "你一直在加分，我会一直记着。"
        : "没关系，我还有很多时间陪你慢慢了解。";

  const restart = document.createElement("button");
  restart.className = "primary-button";
  restart.textContent = "再玩一次";
  restart.addEventListener("click", restartQuiz);

  result.append(emoji, title, scoreText, message, restart);
  quizCard.appendChild(result);
};

const restartQuiz = () => {
  currentIndex = 0;
  score = 0;

  quizCard.innerHTML = `
    <div class="quiz-progress" id="quiz-progress"></div>
    <h2 class="quiz-question" id="quiz-question"></h2>
    <div class="quiz-options" id="quiz-options"></div>
  `;

  quizProgress = document.getElementById("quiz-progress");
  quizQuestion = document.getElementById("quiz-question");
  quizOptions = document.getElementById("quiz-options");

  renderQuestion();
};

renderQuestion();
