// ==========================
// ELEMENTS
// ==========================

const startBtn = document.getElementById("startBtn");
const submitBtn = document.getElementById("submitBtn");
const restartBtn = document.getElementById("restartBtn");

const timerText = document.getElementById("timer");
const attemptText = document.getElementById("attempts");
const statusText = document.getElementById("status");

const hintList = document.getElementById("hintList");
const bombImage = document.getElementById("bombImage");

const inputs = document.querySelectorAll(".pin-input");

// ==========================
// VARIABLES
// ==========================

let secretPin = "";
let attempts = 3;
let time = 30;
let timer;
let gameStarted = false;

// ==========================
// AUTO MOVE INPUT
// ==========================

inputs.forEach((input, index) => {

    input.addEventListener("input", () => {

        input.value = input.value.replace(/[^0-9]/g, "");

        if (input.value !== "" && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }

    });

});

// ==========================
// START GAME
// ==========================

startBtn.addEventListener("click", startGame);

function startGame() {

    clearInterval(timer);

    gameStarted = true;

    attempts = 3;
    time = 30;

    attemptText.textContent = attempts;
    timerText.textContent = time;

    statusText.textContent = "Defusing...";

    bombImage.textContent = "💣";

    inputs.forEach(input => input.value = "");

    generatePin();
    generateHints();

    timer = setInterval(() => {

        time--;

        timerText.textContent = time;

        if (time <= 0) {

            explodeBomb();

        }

    }, 1000);

}

// ==========================
// RANDOM PIN
// ==========================

function generatePin() {

    secretPin = "";

    for (let i = 0; i < 4; i++) {

        secretPin += Math.floor(Math.random() * 10);

    }

    console.log("Secret PIN :", secretPin);

}

// ==========================
// GENERATE HINTS
// ==========================

function generateHints() {

    hintList.innerHTML = "";

    for (let i = 0; i < 4; i++) {

        const digit = Number(secretPin[i]);

        const hint = document.createElement("li");

        switch (i) {

            case 0:

                hint.textContent =
                    digit % 2 === 0 ?
                    "Digit 1 is Even"
                    :
                    "Digit 1 is Odd";

                break;

            case 1:

                hint.textContent =
                    digit > 5 ?
                    "Digit 2 is Greater than 5"
                    :
                    "Digit 2 is Less than or Equal to 5";

                break;

            case 2:

                hint.textContent =
                    isPrime(digit) ?
                    "Digit 3 is Prime"
                    :
                    "Digit 3 is Not Prime";

                break;

            case 3:

                hint.textContent =
                    digit % 2 === 0 ?
                    "Digit 4 is Even"
                    :
                    "Digit 4 is Odd";

                break;

        }

        hintList.appendChild(hint);

    }

}

// ==========================
// PRIME CHECK
// ==========================

function isPrime(num) {

    if (num < 2)
        return false;

    for (let i = 2; i < num; i++) {

        if (num % i === 0)
            return false;

    }

    return true;

}

// ==========================
// SUBMIT PIN
// ==========================

submitBtn.addEventListener("click", () => {

    if (!gameStarted)
        return;

    let enteredPin = "";

    inputs.forEach(input => {

        enteredPin += input.value;

    });

    if (enteredPin.length !== 4) {

        alert("Please enter all 4 digits.");

        return;

    }

    if (enteredPin === secretPin) {

        clearInterval(timer);

        bombImage.textContent = "💣";

        statusText.textContent = "Bomb Defused ✅";

        alert("🎉 Congratulations!\nBomb Defused Successfully.");

        gameStarted = false;

        return;

    }

    attempts--;

    attemptText.textContent = attempts;

    statusText.textContent = "Wrong PIN ❌";

    if (attempts <= 0) {

        explodeBomb();

    }

});

// ==========================
// EXPLODE BOMB
// ==========================

function explodeBomb() {

    clearInterval(timer);

    bombImage.textContent = "💥";

    statusText.textContent = "Bomb Exploded";

    alert("💥 BOOM!\nThe Bomb Exploded.");

    gameStarted = false;

}

// ==========================
// RESTART GAME
// ==========================

restartBtn.addEventListener("click", () => {

    clearInterval(timer);

    gameStarted = false;

    attempts = 3;
    time = 30;

    timerText.textContent = time;
    attemptText.textContent = attempts;

    statusText.textContent = "Waiting...";

    bombImage.textContent = "💣";

    hintList.innerHTML = "<li>Press Start to Generate Hints</li>";

    inputs.forEach(input => input.value = "");

});