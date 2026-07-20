// Guess My Number - DOM logic
(function () {
  const numberEl = document.getElementById("number");
  const messageEl = document.getElementById("message");
  const scoreEl = document.getElementById("score");
  const highscoreEl = document.getElementById("highscore");
  const guessInput = document.getElementById("guess");
  const checkBtn = document.getElementById("check");
  const againBtn = document.getElementById("again");

  let secretNumber;
  let score;
  let highscore = 0;

  function init() {
    secretNumber = Math.trunc(Math.random() * 20) + 1; // 1..20
    score = 20;
    scoreEl.textContent = score;
    numberEl.textContent = "?";
    messageEl.textContent = "Start guessing...";
    guessInput.value = "";
    document.body.querySelector(".number").style.color = ""; // reset any green
    numberEl.style.backgroundColor = ""; // reset this
    numberEl.classList.remove("win");
  }

  function displayMessage(msg) {
    messageEl.textContent = msg;
  }

  checkBtn.addEventListener("click", function () {
    const guess = Number(guessInput.value);

    if (!guess || guess < 1 || guess > 20) {
      displayMessage("⛔ Enter a number between 1 and 20");
      return;
    }

    if (guess === secretNumber) {
      displayMessage("🎉 Correct! You guessed the number.");
      numberEl.textContent = secretNumber;
      //   document.body.querySelector(".number").style.color = "#60b347";
      numberEl.style.color = "#60b347";
      numberEl.style.backgroundColor = "#000000";
      numberEl.classList.add("win");

      if (score > highscore) {
        highscore = score;
        highscoreEl.textContent = highscore;
      }
      return;
    }

    // Wrong guess
    if (score > 1) {
      displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
      score -= 1;
      scoreEl.textContent = score;
    } else {
      displayMessage("💥 You lost the game!");
      score = 0;
      scoreEl.textContent = score;
      numberEl.textContent = secretNumber;
      numberEl.style.color = "#8B0000";
      numberEl.style.backgroundColor = "#000000";
      numberEl.classList.remove("win");
    }
  });

  // Allow pressing Enter in the input to check
  guessInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") checkBtn.click();
  });

  againBtn.addEventListener("click", init);

  // Initialize on load
  init();
})();
