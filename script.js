
let secretNumber;
let attemptsLeft;
let attemptsUsed;
let maxNumber;
let maxAttempts;

const startBtn = document.getElementById("startBtn");
const gameScreen = document.getElementById("gameScreen");
const guessInput = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const attemptsDisplay = document.getElementById("attempts");
const usedDisplay = document.getElementById("used");
const message = document.getElementById("message");
const difficulty = document.getElementById("difficulty");

const resultScreen = document.getElementById("resultScreen");
const resultTitle = document.getElementById("resultTitle");
const finalNumber = document.getElementById("finalNumber");
const finalScore = document.getElementById("finalScore");
const finalAttempts = document.getElementById("finalAttempts");
const playAgainBtn = document.getElementById("playAgainBtn");
const bestScoreDisplay = document.getElementById("bestScore");
function startGame() {

    if (difficulty.value === "easy") {
        maxNumber = 50;
        maxAttempts = 10;
    }
    else if (difficulty.value === "medium") {
        maxNumber = 100;
        maxAttempts = 7;
    }
    else {
        maxNumber = 200;
        maxAttempts = 5;
    }

    secretNumber = Math.floor(Math.random() * maxNumber) + 1;

    attemptsLeft = maxAttempts;
    attemptsUsed = 0;

    startBtn.style.display = "none";
    difficulty.disabled = true;

    gameScreen.style.display = "block";
    resultScreen.style.display = "none";

    guessInput.style.display = "block";
    submitBtn.style.display = "inline-block";

    guessInput.max = maxNumber;
    guessInput.value = "";

    attemptsDisplay.textContent = attemptsLeft;
    usedDisplay.textContent = attemptsUsed;

    message.textContent =
        "Guess a number between 1 and " + maxNumber;

    submitBtn.disabled = false;

    console.log("Secret Number:", secretNumber);
}

startBtn.addEventListener("click", startGame);

submitBtn.addEventListener("click", function () {

    let guess = Number(guessInput.value);

    if (guessInput.value === "") {
        message.textContent = "Please enter a number!";
        return;
    }

    if (!Number.isInteger(guess) || guess < 1 || guess > maxNumber) {
        message.textContent =
            "Enter a valid number between 1 and " + maxNumber;
        return;
    }

    attemptsUsed++;
    attemptsLeft--;

    attemptsDisplay.textContent = attemptsLeft;
    usedDisplay.textContent = attemptsUsed;

    if (guess === secretNumber) {
        finishGame(true);
    }
    else if (attemptsLeft === 0) {
        finishGame(false);
    }
    else if (guess < secretNumber) {
        message.textContent = "📈 Too Low! Try a Higher Number.";
    }
    else {
        message.textContent = "📉 Too High! Try a Lower Number.";
    }

    guessInput.value = "";
});

function finishGame(won) {

    submitBtn.style.display = "none";
    guessInput.style.display = "none";

    resultScreen.style.display = "block";

    if (won) {
        resultTitle.textContent = "🎉 Congratulations! You Won!";

        let multiplier = 1;

        if (difficulty.value === "medium") {
            multiplier = 2;
        }
        else if (difficulty.value === "hard") {
            multiplier = 3;
        }

        let score = (maxAttempts - attemptsUsed + 1) * 100 * multiplier;

        finalScore.textContent = "Final Score: " + score;
        let bestScore = Number(localStorage.getItem("bestScore")) || 0;

if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("bestScore", bestScore);
}

message.textContent = "🏆 Your Best Score: " + bestScore;
bestScoreDisplay.textContent = "🏆 Best Score: " + bestScore;
    }
    else {
        resultTitle.textContent = "😢 Game Over!";
        finalScore.textContent = "Final Score: 0";
    }

    finalNumber.textContent = "Secret Number: " + secretNumber;
    finalAttempts.textContent = "Attempts Used: " + attemptsUsed;

    difficulty.disabled = false;
}

playAgainBtn.addEventListener("click", startGame);
