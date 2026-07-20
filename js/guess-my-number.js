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
  const currentYearEl = document.getElementById("current-year");

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
      messageEl.style.color = "";
    }
    if (guessInput) {
      guessInput.value = "";
      guessInput.disabled = false;
      guessInput.focus();
    }
    if (checkBtn) {
      checkBtn.disabled = false;
      checkBtn.style.opacity = "";
    }

    console.log("🎮 New game started! Secret number:", secretNumber);
  }

  /**
   * Display a message to the user
   * @param {string} msg - Message to display
   * @param {string} [type] - Optional type for styling (success, error, warning)
   */
  function displayMessage(msg, type = "neutral") {
    if (!messageEl) return;
    
    messageEl.textContent = msg;
    
    // Optional: Add color coding based on message type
    switch (type) {
      case "success":
        messageEl.style.color = "#60b347";
        break;
      case "error":
        messageEl.style.color = "#dc2626";
        break;
      case "warning":
        messageEl.style.color = "#f59e0b";
        break;
      default:
        messageEl.style.color = "";
    }
  }

  /**
   * Handle the check button click
   */
  function handleCheck() {
    const guess = Number(guessInput?.value);

    // Validate input
    if (!guess || guess < 1 || guess > 20) {
      displayMessage("⛔ Enter a number between 1 and 20", "warning");
      guessInput?.focus();
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
      scoreEl.textContent = score;
      
      const hint = guess > secretNumber ? "📈 Too high!" : "📉 Too low!";
      displayMessage(hint, "warning");
      
      // Provide visual feedback
      guessInput?.classList.add("shake");
      setTimeout(() => guessInput?.classList.remove("shake"), 300);
      
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
      highscoreEl.textContent = highscore;
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
    displayMessage("💥 You lost the game!", "error");
    
    if (numberEl) {
      numberEl.textContent = secretNumber;
      numberEl.classList.add("lose");
    }
    
    scoreEl.textContent = 0;
    
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
    "font-size: 14px; font-weight: bold; color: #38bdf8;"
  );
  console.log(
    "%cHow to play: Enter a number (1-20) and click Check!",
    "font-size: 12px; color: #9ca3af;"
  );
})();
