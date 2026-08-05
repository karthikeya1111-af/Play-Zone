// Select both cubes
const userCube = document.getElementById("userCube");
const computerCube = document.getElementById("computerCube");

// Roll Displays
const userRollText = document.getElementById("userRoll");
const computerRollText = document.getElementById("computerRoll");

// Total Score Displays
const userTotalText = document.getElementById("userTotal");
const computerTotalText = document.getElementById("computerTotal");

// Result Text
const resultText = document.getElementById("result");

// Roll Button
const rollBtn = document.getElementById("rollBtn");

// Total Scores
let userTotal = 0;
let computerTotal = 0;

// Spin counters
// Used to add extra rotations
// so cube always rolls realistically
let userSpins = 0;
let computerSpins = 0;

/*
Each dice value needs a specific
rotation to face the camera.
*/
const rotations = {
    1: { x: 0, y: 0 },
    2: { x: 0, y: -90 },
    3: { x: -90, y: 0 },
    4: { x: 90, y: 0 },
    5: { x: 0, y: 90 },
    6: { x: 0, y: 180 }
};

/*
Create 9 dots inside every face.

CSS decides which dots become visible
for numbers 1 to 6.
*/
document.querySelectorAll(".face").forEach(face => {

    for (let i = 0; i < 9; i++) {

        const dot = document.createElement("div");

        dot.className = "dot";

        face.appendChild(dot);
    }

});

// Roll Button Click
rollBtn.addEventListener("click", () => {

    rollBtn.disabled = true;

    // Random User Roll
    const userRoll = Math.ceil(Math.random() * 6);

    // Random Computer Roll
    const computerRoll = Math.ceil(Math.random() * 6);

    userSpins++;
    computerSpins++;

    /*
    Add multiple complete rotations.

    Example:
    360 = one full spin
    720 = two full spins
    1080 = three full spins

    Makes animation feel realistic.
    */
    const userExtraX = 360 * (userSpins % 3 + 2);
    const userExtraY = 360 * (userSpins % 4 + 2);

    const computerExtraX = 360 * (computerSpins % 3 + 2);
    const computerExtraY = 360 * (computerSpins % 4 + 2);

    const userRotation = rotations[userRoll];
    const computerRotation = rotations[computerRoll];

    /*
    Cube spins many times and
    finally lands on correct number.
    */
    userCube.style.transform =
        `rotateX(${userExtraX + userRotation.x}deg)
         rotateY(${userExtraY + userRotation.y}deg)`;

    computerCube.style.transform =
        `rotateX(${computerExtraX + computerRotation.x}deg)
         rotateY(${computerExtraY + computerRotation.y}deg)`;

    // Wait until animation completes
    setTimeout(() => {

        userTotal += userRoll;
        computerTotal += computerRoll;

        userRollText.textContent = userRoll;
        computerRollText.textContent = computerRoll;

        userTotalText.textContent = userTotal;
        computerTotalText.textContent = computerTotal;

        if (userRoll > computerRoll) {
            resultText.textContent = "User Wins This Round 🎉";
        }
        else if (computerRoll > userRoll) {
            resultText.textContent = "Computer Wins This Round 🤖";
        }
        else {
            resultText.textContent = "It's a Draw 🤝";
        }

        rollBtn.disabled = false;

    }, 1200);

});
/*
Reset the entire game.

Sets:
- Current rolls to 0
- Total scores to 0
- Result message cleared
- Dice returns to starting position
*/
quitBtn.addEventListener("click", () => {

    // Reset score variables
    userTotal = 0;
    computerTotal = 0;

    // Reset spin counters
    userSpins = 0;
    computerSpins = 0;

    // Update UI
    userRollText.textContent = 0;
    computerRollText.textContent = 0;

    userTotalText.textContent = 0;
    computerTotalText.textContent = 0;

    resultText.textContent = "Game Reset";

    // Return dice to initial position
    userCube.style.transform =
        "rotateX(-30deg) rotateY(30deg)";

    computerCube.style.transform =
        "rotateX(-30deg) rotateY(30deg)";
});