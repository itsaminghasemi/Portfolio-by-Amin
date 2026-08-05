// Guess My Number - Complete Game Logic
// Synced with portfolio design system

(function () {
  "use strict";

  // DOM Elements
  const numberEl = document.getElementById("number");
  const messageEl = document.getElementById("message");
  const scoreEl = document.getElementById("score");
  const highscoreEl = document.getElementById("highscore");
  const guessInput = document.getElementById("guess");
  const checkBtn = document.getElementById("check");
  const againBtn = document.getElementById("again");
  const currentYearEl = document.getElementById("year");

  // Game State
  let secretNumber;
  let score;
  let highscore = localStorage.getItem("guessMyNumberHighscore") || 0;

  // Initialize footer year
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // Display initial highscore
  if (highscoreEl) {
    highscoreEl.textContent = highscore;
  }

  /**
   * Initialize/Reset the game
   */
  function init() {
    secretNumber = Math.trunc(Math.random() * 20) + 1; // Generate 1-20
    score = 20;

    // Reset UI
    if (scoreEl) scoreEl.textContent = score;
    if (numberEl) {
      numberEl.textContent = "?";
      numberEl.className = "number-display"; // Remove win/lose classes
      numberEl.style.color = "";
      numberEl.style.backgroundColor = "";
    }
    if (messageEl) {
      messageEl.textContent = "Start guessing...";
      messageEl.className = "message-text"; // Reset classes
    }
    if (guessInput) {
      guessInput.value = "";
      guessInput.disabled = false;
      guessInput.focus({ preventScroll: true });
    }
    if (checkBtn) {
      checkBtn.disabled = false;
      checkBtn.style.opacity = "";
    }

    console.log("🎮 New game started! Secret number:", secretNumber);
  }

  /**
   * Display a message to the user
   * @param {string} msg - The message to display
   * @param {'success' | 'error' | 'warning' | 'info' | 'neutral'} type - Message type for styling
   */
  function displayMessage(msg, type = "neutral") {
    if (!messageEl) return;

    messageEl.textContent = msg;

    // Reset classes then add specific type
    messageEl.className = "message-text";
    if (type !== "neutral") {
      messageEl.classList.add(type);
    }
  }

  /**
   * Handle the check button click
   */
  function handleCheck() {
    const guess = Number(guessInput?.value);

    // Validate input: No input
    if (!guess) {
      displayMessage("⛔ No number!", "warning");
      guessInput?.focus();
      return;
    }

    // Validate input: Out of range (Under 0 or Over 20)
    if (guess < 0 || guess > 20) {
      displayMessage("❌ Incorrect! (Out of Range)", "error");
      if (score > 1) {
        score--;
        if (scoreEl) scoreEl.textContent = score;
      } else {
        handleLoss();
      }
      return;
    }

    // Check if guess is correct
    if (guess === secretNumber) {
      handleWin();
      return;
    }

    // Wrong guess - decrease score
    if (score > 1) {
      score -= 1;
      if (scoreEl) scoreEl.textContent = score;

      // Calculate difference for specific hints
      const diff = Math.abs(secretNumber - guess);
      let hint = "";
      let type = "warning";

      // LOGIC: Specific Ranges based on your request
      if (diff <= 5) {
        // Within 5 numbers: "Low" or "High"
        if (guess < secretNumber) {
          hint = "Low 🔼";
        } else {
          hint = "High 🔽";
        }
        type = "warning"; // Orange
      } else {
        // More than 5 numbers away: "Too Low" or "Too High"
        if (guess < secretNumber) {
          hint = "Too Low! ⬇️";
        } else {
          hint = "Too High! ⬆️";
        }
        type = "error"; // Red
      }

      displayMessage(hint, type);

      // Provide visual feedback (shake animation)
      if (guessInput) {
        guessInput.classList.add("shake");
        setTimeout(() => guessInput.classList.remove("shake"), 300);
      }

      guessInput.value = "";
      guessInput.focus();
    } else {
      handleLoss();
    }
  }

  /**
   * Handle winning the game
   */
  function handleWin() {
    displayMessage("🎉 Correct! You guessed the number!", "success");

    if (numberEl) {
      numberEl.textContent = secretNumber;
      numberEl.classList.add("win");
    }

    // Update highscore
    if (score > highscore) {
      highscore = score;
      if (highscoreEl) highscoreEl.textContent = highscore;
      localStorage.setItem("guessMyNumberHighscore", highscore);

      // Celebrate new highscore
      setTimeout(() => {
        displayMessage("🏆 New Highscore! 🎊", "success");
      }, 800);
    }

    // Disable input after win
    if (guessInput) guessInput.disabled = true;
    if (checkBtn) {
      checkBtn.disabled = true;
      checkBtn.style.opacity = "0.6";
    }
  }

  /**
   * Handle losing the game
   */
  function handleLoss() {
    displayMessage("💀 You lost the game!", "error");

    if (numberEl) {
      numberEl.textContent = secretNumber;
      numberEl.classList.add("lose");
    }

    if (scoreEl) scoreEl.textContent = 0;

    // Disable input after loss
    if (guessInput) guessInput.disabled = true;
    if (checkBtn) {
      checkBtn.disabled = true;
      checkBtn.style.opacity = "0.6";
    }
  }

  /**
   * Handle keyboard events
   * @param {KeyboardEvent} e
   */
  function handleKeydown(e) {
    if (e.key === "Enter" && !guessInput.disabled) {
      handleCheck();
    }
  }

  // Event Listeners
  if (checkBtn) {
    checkBtn.addEventListener("click", handleCheck);
  }

  if (guessInput) {
    guessInput.addEventListener("keydown", handleKeydown);
  }

  if (againBtn) {
    againBtn.addEventListener("click", init);
  }

  // Initialize game on load
  init();

  // Log game info for debugging
  console.log(
    "%c🎮 Guess My Number Game Loaded!",
    "font-size: 14px; font-weight: bold; color: #38bdf8;",
  );
  console.log(
    "%cHow to play: Enter a number (0-20) and click Check!",
    "font-size: 12px; color: #9ca3af;",
  );
})();
