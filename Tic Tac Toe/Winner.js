const winner = localStorage.getItem("winner");
const winnerText = document.querySelector("#winnerText");
const restart = document.querySelector("#restart");
if(winner === "Draw"){
    winnerText.innerText = "🤝 Match Draw!\nBetter Luck Next Round";
}
else{
    winnerText.innerText = "🏆 Congratulations!\n\nPlayer " + winner + " Wins!";
}
restart.addEventListener("click",()=>{
    localStorage.removeItem("winner");
    window.location.href="index.html";
});