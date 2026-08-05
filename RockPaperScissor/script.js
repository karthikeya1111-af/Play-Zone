let userMarks = 0;
let computerMarks = 0;
const userImg = document.getElementById("userImg");
const compImg = document.getElementById("compImg");
const choices = document.querySelectorAll(".choice");
const result = document.querySelector("#Result p");
const userscore = document.getElementById("userScore");
const compscore = document.getElementById("compScore");
// Image Animations code 
const showBattle = (userchoice, compchoice) => {
    userImg.classList.add("shakePlayer");
    compImg.classList.add("shakeComputer");
    setTimeout(() => {
        userImg.classList.remove("shakePlayer");
        compImg.classList.remove("shakeComputer");
        userImg.src = "gameImages/"+userchoice.toLowerCase() + "Player.png";
        compImg.src = "gameImages/"+compchoice.toLowerCase() + "Computer.png";
    },700);
}
const compGame = () => {
      const array = ["Rock","Paper","Scissor"];
      const idx = Math.floor(Math.random()*3);
      return array[idx];
}
const decision = (userWin,userchoice,compchoice) => {
     if(userchoice==compchoice){
         result.innerText = "Nobody Wins This Round!";
     }
     else{
          if(userWin){
             result.innerText = "User Wins!\n" + userchoice + " Beats " + compchoice;
             userMarks++;
             userscore.innerText = userMarks;
          }
          else{
              result.innerText = "Computer Wins!\n" +compchoice + " Beats " + userchoice;
              computerMarks++;
              compscore.innerText = computerMarks
          }
     }
}
const playGame = (userchoice) => {
      const compchoice = compGame();
      showBattle(userchoice, compchoice);
      console.log("User Choice: ",userchoice);
      console.log("Computer Choice: ",compchoice);
      let userWin = true;
      setTimeout(() => {
      if(userchoice===compchoice){
         decision(true,userchoice,compchoice);
      }
      else{
          if(userchoice==="Paper"){
              userWin = compchoice==="Rock" ? true : false;
          }
          else if(userchoice == "Rock"){
              userWin = compchoice==="Scissor" ? true : false;
          }
          else{
               userWin = compchoice==="Paper" ? true : false;
          }
          decision(userWin,userchoice,compchoice);
      }
    },700);
}
choices.forEach((c) => {
     c.addEventListener("click" , ()=>
    {
        // console.log("Choice Was Clicked")
        // console.log("User Clicked On ",c.getAttribute("id"));
        result.innerText = "Processing Your Move...";
        const userchoice =  c.getAttribute("id");
        playGame(userchoice);
    })
})