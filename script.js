const Game = (() => {
    let randomNumber = 70; // Fixed answer for demonstration
    let attempts = 0;
  
    // Cache DOM elements
    const elements = {
      input: document.getElementById('guessInput'),
      result: document.getElementById('result'),
      attemptCounter: document.getElementById('attemptCounter'),
      restartButton: document.getElementById('restartButton'),
    };
  
    // Core Game Logic
    function checkGuess() {
      const userGuess = Number(elements.input.value);
  
      if (!userGuess || userGuess < 1 || userGuess > 100) {
        updateResult("Please enter a valid number between 1 and 100!", "text-red-500");
        return;
      }
  
      attempts++;
      elements.attemptCounter.textContent = `Attempts: ${attempts}`;
  
      if (userGuess === randomNumber) {
        updateResult("🎉 Correct! You guessed it right!", "text-green-500 animate-pulse");
        elements.input.disabled = true;
        elements.restartButton.classList.remove("hidden");
      } else {
        provideHint(userGuess);
      }
    }
  
    // Hint System
    function provideHint(userGuess) {
      const difference = Math.abs(userGuess - randomNumber);
      let message, style;
  
      if (difference <= 5) {
        message = "You're extremely close! Just a bit off.";
        style = "text-orange-500 animate-bounce";
      } else if (difference <= 10) {
        message = "Very close! A small adjustment needed.";
        style = "text-yellow-500";
      } else if (difference <= 20) {
        message = "Close! Keep trying.";
        style = "text-blue-500";
      } else {
        message = userGuess < randomNumber ? "Too low! Try a higher number." : "Too high! Try a lower number.";
        style = "text-red-500";
      }
  
      updateResult(message, style);
    }
  
    // Update Result with Message and Style
    function updateResult(message, style) {
      elements.result.textContent = message;
      elements.result.className = `${style} text-lg font-semibold transition-all`;
    }
  
    // Restart Game Logic
    function restartGame() {
      attempts = 0;
      randomNumber = 70; // Re-set fixed answer
      elements.input.value = '';
      elements.input.disabled = false;
      elements.result.textContent = '';
      elements.attemptCounter.textContent = "Attempts: 0";
      elements.restartButton.classList.add("hidden");
    }
  
    // Expose Methods
    return {
      checkGuess,
      restartGame,
    };
  })();
  
  // Dark Mode Toggle
  document.querySelector('.toggle-theme-btn').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const themeIcon = document.getElementById('themeIcon');
    themeIcon.textContent = document.body.classList.contains('dark') ? 'brightness_7' : 'brightness_4';
  });
  