// ==========================
// ELEMENTS
// ==========================

const colors = document.querySelectorAll(".color");

const levelText = document.getElementById("level");
const scoreText = document.getElementById("score");
const bestText = document.getElementById("bestScore");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const message = document.getElementById("message");

// ==========================
// VARIABLES
// ==========================

const colorNames = ["red","blue","green","yellow"];

let gameSequence = [];
let userSequence = [];

let level = 1;
let score = 0;

let playing = false;

// ==========================
// BEST SCORE
// ==========================

let best = localStorage.getItem("bestColorScore") || 0;
bestText.textContent = best;

// ==========================
// START GAME
// ==========================

startBtn.addEventListener("click",()=>{

    if(playing) return;

    gameSequence = [];
    userSequence = [];

    level = 1;
    score = 0;

    updateBoard();

    playing = true;

    nextLevel();

});

// ==========================
// RESTART
// ==========================

restartBtn.addEventListener("click",()=>{

    gameSequence = [];
    userSequence = [];

    level = 1;
    score = 0;

    playing = false;

    updateBoard();

    message.textContent="Press Start to Play";

});

// ==========================
// NEXT LEVEL
// ==========================

function nextLevel(){

    userSequence=[];

    message.textContent="Watch Carefully...";

    const randomColor =
        colorNames[Math.floor(Math.random()*4)];

    gameSequence.push(randomColor);

    playSequence();

}

// ==========================
// PLAY SEQUENCE
// ==========================

function playSequence(){

    let i=0;

    const interval=setInterval(()=>{

        flash(gameSequence[i]);

        i++;

        if(i>=gameSequence.length){

            clearInterval(interval);

            message.textContent="Your Turn";

        }

    },700);

}

// ==========================
// FLASH TILE
// ==========================

function flash(color){

    const tile=document.querySelector(
        `[data-color="${color}"]`
    );

    tile.classList.add("flash");

    setTimeout(()=>{

        tile.classList.remove("flash");

    },350);

}

// ==========================
// USER CLICK
// ==========================

colors.forEach(tile=>{

    tile.addEventListener("click",()=>{

        if(!playing) return;

        const color=tile.dataset.color;

        flash(color);

        userSequence.push(color);

        checkAnswer();

    });

});

// ==========================
// CHECK ANSWER
// ==========================

function checkAnswer(){

    let current=userSequence.length-1;

    if(userSequence[current]!==gameSequence[current]){

        message.textContent="Game Over ❌";

        playing=false;

        if(score>best){

            best=score;

            localStorage.setItem(
                "bestColorScore",
                best
            );

            bestText.textContent=best;

        }

        return;

    }

    if(userSequence.length===gameSequence.length){

        score++;

        level++;

        updateBoard();

        message.textContent="Correct ✅";

        setTimeout(()=>{

            nextLevel();

        },900);

    }

}

// ==========================
// UPDATE SCORE
// ==========================

function updateBoard(){

    levelText.textContent=level;
    scoreText.textContent=score;
    bestText.textContent=best;

}