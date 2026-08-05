const boxes = document.querySelectorAll(".box");
const xTurn = document.querySelector(".x-turn");
const oTurn = document.querySelector(".y-turn");
let turn = "X";
let gameOver = false;
const winPatterns = [
    // Check Rows 
    [0,1,2],
    [3,4,5],
    [6,7,8],
    // Check Columns
    [0,3,6],
    [1,4,7],
    [2,5,8],
    // Check Diagonals
    [0,4,8],
    [2,4,6]
];
// If already X Turn Occured Change to Y turn And Vice Versa
const changeTurn = () => {
    if(turn === "X"){
        turn = "O";
    }
    else{
        turn = "X";
    }
};
// Flipping of Box And Changing Of Color
const updateTurn = () =>{
    if(turn === "X"){
        xTurn.style.backgroundColor = "#9a0002";
        xTurn.style.color = "#efe6dd";
        oTurn.style.backgroundColor = "#efe6dd";
        oTurn.style.color = "#9a0002";
    }
    else{
        oTurn.style.backgroundColor = "#9a0002";
        oTurn.style.color = "#efe6dd";
        xTurn.style.backgroundColor = "#efe6dd";
        xTurn.style.color = "#9a0002";
    }
};
// Main Logic For The Code 
const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if(pos1 !== "" && pos2 !== "" && pos3 !== ""){
            if(pos1 === pos2 && pos2 === pos3){
                gameOver = true;
             /*   setTimeout(() => {
                  // Code to execute
                  // }, delayInMilliseconds);*/
                setTimeout(() => {
                      localStorage.setItem("winner",pos1);
                      window.location.href = "Winner.html";
                      return;
                },600);
            }
        }
    }
};
// Checking Draw
const checkDraw = () => {
    let moves = 0;
    boxes.forEach((box)=>{
        if(box.innerText !== ""){
            moves++;
        }
    });
    if(moves === 9 && !gameOver){
        gameOver = true;
        setTimeout(()=>{
              localStorage.setItem("winner","Draw");
              window.location.href= "Winner.html";
              return;
        },600);
    }
};
// 
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(box.innerText !== ""){
            return;
        }
        box.innerText = turn;
        checkWinner();
        checkDraw();
        if(!gameOver){
            changeTurn();
            updateTurn();
        }

    });
    });