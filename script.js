// =====================================
// Guess the Number Game
// =====================================

// Generate a random number from 1 to 100
let randomNumber = Math.floor(Math.random() * 100) + 1;

// Keep track of attempts
let attempts = 0;

// Track whether the game has finished
let gameOver = false;


// =====================================
// Get HTML elements
// =====================================

const guessInput = document.getElementById("guessInput");
const checkButton = document.getElementById("checkButton");
const restartButton = document.getElementById("restartButton");

const message = document.getElementById("message");
const attemptCount = document.getElementById("attemptCount");
const numberBox = document.getElementById("numberBox");


// =====================================
// Check the user's guess
// =====================================

function checkGuess() {

    // Don't allow guesses after winning
    if (gameOver) {
        return;
    }

    // Get the input value
    const guess = Number(guessInput.value);


    // Check if the input is empty or invalid
    if (
        guessInput.value.trim() === "" ||
        !Number.isInteger(guess) ||
        guess < 1 ||
        guess > 100
    ) {

        message.textContent =
            "⚠️ Please enter a whole number from 1 to 100.";

        message.className = "error";

        return;
    }


    // Increase attempts
    attempts++;

    attemptCount.textContent = attempts;


    // =================================
    // Compare the guess
    // =================================

    if (guess === randomNumber) {

        // Correct answer
        message.textContent =
            `🎉 Correct! You guessed the number in ${attempts} attempts!`;

        message.className = "success";

        // Show the correct number
        numberBox.textContent = randomNumber;

        // Game is finished
        gameOver = true;

        // Disable input and check button
        guessInput.disabled = true;
        checkButton.disabled = true;

    }

    else if (guess < randomNumber) {

        // Guess is too low
        message.textContent =
            "⬆️ Too low! Try a higher number.";

        message.className = "higher";

    }

    else {

        // Guess is too high
        message.textContent =
            "⬇️ Too high! Try a lower number.";

        message.className = "lower";
    }


    // Clear input
    guessInput.value = "";

    // Put cursor back into input
    guessInput.focus();
}


// =====================================
// Start a new game
// =====================================

function restartGame() {

    // Generate a new random number
    randomNumber =
        Math.floor(Math.random() * 100) + 1;

    // Reset attempts
    attempts = 0;

    // Reset game status
    gameOver = false;

    // Reset display
    attemptCount.textContent = "0";

    numberBox.textContent = "?";

    message.textContent = "";

    message.className = "";

    // Enable input and button
    guessInput.disabled = false;
    checkButton.disabled = false;

    // Clear input
    guessInput.value = "";

    // Focus input
    guessInput.focus();
}


// =====================================
// Button events
// =====================================

checkButton.addEventListener(
    "click",
    checkGuess
);

restartButton.addEventListener(
    "click",
    restartGame
);


// =====================================
// Allow ENTER key to submit guess
// =====================================

guessInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {
            checkGuess();
        }

    }
);


// Focus input when page loads
guessInput.focus();