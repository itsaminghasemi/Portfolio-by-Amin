// /js/guess-my-number.js
// DOM-based Guess My Number game (final, consistent IDs + localStorage highscore)
(function () {
  // Main header (the first header element contains the number)
  const headerEl = document.querySelector("header");
  const numberEl = document.getElementById("number");
  const messageEl = document.getElementById("message");
  const scoreEl = document.getElementById("score");
  const highscoreEl = document.getElementById("highscore");
  const guessInput = document.getElementById("guess");
  const checkBtn = document.getElementById("check");
  const againBtn = document.getElementById("again");

  let secretNumber;
  let score;
  let highscore = Number(localStorage.getItem("gmnumber_highscore")) || 0;
  highscoreEl.textContent = highscore;

  function init() {
    secretNumber = Math.trunc(Math.random() * 20) + 1; // 1..20
    score = 20;
    scoreEl.textContent = score;
    numberEl.textContent = "?";
    messageEl.textContent = "Start guessing...";
    guessInput.value = "";
    headerEl.classList.remove("win-header");
    numberEl.classList.remove("win");
    guessInput.removeAttribute("disabled");
    guessInput.focus();
  }

  function setMessage(msg) {
    messageEl.textContent = msg;
  }

  function handleWin() {
    setMessage("🎉 Correct! You guessed the number.");
    numberEl.textContent = secretNumber;
    headerEl.classList.add("win-header");
    numberEl.classList.add("win");
    guessInput.setAttribute("disabled", "true");

    if (score > highscore) {
      highscore = score;
      highscoreEl.textContent = highscore;
      try {
        localStorage.setItem("gmnumber_highscore", String(highscore));
      } catch (e) {
        // ignore storage errors (private mode, quota, etc.)
      }
    }
  }

  checkBtn.addEventListener("click", function () {
    const raw = guessInput.value;
    const guess = Number(raw);

    if (raw === "" || !Number.isFinite(guess) || guess < 1 || guess > 20) {
      setMessage("⛔ Enter a number between 1 and 20");
      return;
    }

    if (guess === secretNumber) {
      handleWin();
      return;
    }

    // wrong guess
    if (score > 1) {
      setMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
      score -= 1;
      scoreEl.textContent = score;
    } else {
      setMessage("💥 You lost the game!");
      score = 0;
      scoreEl.textContent = score;
      numberEl.textContent = secretNumber;
      headerEl.classList.remove("win-header");
      numberEl.classList.remove("win");
      guessInput.setAttribute("disabled", "true");
    }
  });

  // Press Enter to check
  guessInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      checkBtn.click();
    }
  });

  againBtn.addEventListener("click", init);

  // initialize on load
  init();
})();
