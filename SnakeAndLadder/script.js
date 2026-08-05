 /*<section id="board">
                  <div class="cell">
                  <span class="number">100</span>
                     </div>
                 <div class="cell">
              <span class="number">99</span>
                     </div>
                </section>*/
// ===========================
// Board Creation
// ===========================
const board = document.querySelector("#board");
const cells = [];

// Create a 10×10 Snake & Ladder board
let cellIndex = 0;
for(let row = 0; row < 10; row++){
    if(row % 2 === 0){
        for(let num = 100 - row * 10; num > 90 - row * 10; num--){
            const cell = document.createElement("div");
            cell.classList.add("cell");
            // Store board position
            cell.dataset.position = num;
            // Alternating checkerboard colors
            const c = cellIndex % 10, r = Math.floor(cellIndex / 10);
            cell.style.background = (r + c) % 2 === 0 ? "#f5ead6" : "#e8d4b0";
            const number = document.createElement("span");
            number.classList.add("number");
            number.innerText = num;
            cell.appendChild(number);
            board.appendChild(cell);
            cells.push(cell);
            cellIndex++;
        }
    }
    else{
        for(let num = 81 - (row - 1) * 10; num <= 90 - (row - 1) * 10; num++){
            const cell = document.createElement("div");
            cell.classList.add("cell");
            // Store board position
            cell.dataset.position = num;
            // Alternating checkerboard colors
            const c = cellIndex % 10, r = Math.floor(cellIndex / 10);
            cell.style.background = (r + c) % 2 === 0 ? "#f5ead6" : "#e8d4b0";
            const number = document.createElement("span");
            number.classList.add("number");
            number.innerText = num;
            cell.appendChild(number);
            board.appendChild(cell);
            cells.push(cell);
            cellIndex++;
        }
    }
}

// ===========================
// SVG Snakes & Ladders Overlay
// ===========================

// Get pixel center of any cell position (1–100) on the 700×700 grid
function getCellCenter(pos) {
    const rowNum    = Math.floor((pos - 1) / 10);       // 0 = row with 1-10, 9 = row with 91-100
    const posInRow  = (pos - 1) % 10;                   // 0–9 within that row
    const col       = (rowNum % 2 === 0) ? posInRow : (9 - posInRow);
    const rowFromTop = 9 - rowNum;                       // 0 = top, 9 = bottom
    return { x: col * 70 + 35, y: rowFromTop * 70 + 35 };
}

const svgNS = "http://www.w3.org/2000/svg";
const overlay = document.createElementNS(svgNS, "svg");
overlay.setAttribute("id", "svg-overlay");
overlay.setAttribute("viewBox", "0 0 700 700");

// Helper: create SVG element with attributes in one call
function mk(tag, attrs) {
    const el = document.createElementNS(svgNS, tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    return el;
}

// Draw a realistic snake from headPos (higher number) → tailPos (lower number)
function drawSnake(headPos, tailPos, bodyColor, darkColor) {
    const h = getCellCenter(headPos);
    const t = getCellCenter(tailPos);
    const dx = t.x - h.x, dy = t.y - h.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    const px = -dy / len, py = dx / len;            // perpendicular unit vector
    const wg = Math.min(60, len * 0.22);             // wiggle amplitude

    // S-curve cubic bezier control points
    const c1x = h.x + dx * 0.33 + px * wg,  c1y = h.y + dy * 0.33 + py * wg;
    const c2x = h.x + dx * 0.67 - px * wg,  c2y = h.y + dy * 0.67 - py * wg;
    const d   = `M ${h.x} ${h.y} C ${c1x} ${c1y} ${c2x} ${c2y} ${t.x} ${t.y}`;

    // Layer 1 — drop shadow
    overlay.appendChild(mk("path", { d, stroke:"rgba(0,0,0,0.18)", "stroke-width":18,
        fill:"none", "stroke-linecap":"round" }));
    // Layer 2 — main body
    overlay.appendChild(mk("path", { d, stroke:bodyColor, "stroke-width":13,
        fill:"none", "stroke-linecap":"round" }));
    // Layer 3 — scale pattern (darker dashes)
    overlay.appendChild(mk("path", { d, stroke:darkColor, "stroke-width":9,
        fill:"none", "stroke-dasharray":"5 9", "stroke-linecap":"round" }));
    // Layer 4 — sheen highlight
    overlay.appendChild(mk("path", { d, stroke:"rgba(255,255,255,0.22)", "stroke-width":4,
        fill:"none", "stroke-linecap":"round" }));

    // Head circle
    overlay.appendChild(mk("circle", { cx:h.x, cy:h.y, r:14,
        fill:bodyColor, stroke:darkColor, "stroke-width":2.5 }));

    // Eyes
    [[-5, -5], [-5, 5]].forEach(([ex, ey]) => {
        overlay.appendChild(mk("circle", { cx:h.x+ex, cy:h.y+ey, r:3, fill:"white" }));
        overlay.appendChild(mk("circle", { cx:h.x+ex+1, cy:h.y+ey, r:1.5, fill:"#111" }));
    });

    // Forked tongue — points away from body
    const tdx = h.x - c1x, tdy = h.y - c1y;
    const tln = Math.sqrt(tdx*tdx + tdy*tdy) || 1;
    const tnx = tdx/tln, tny = tdy/tln;
    const ts  = { x: h.x + tnx*14, y: h.y + tny*14 };  // tongue start at mouth
    const te  = { x: ts.x + tnx*10, y: ts.y + tny*10 }; // fork center
    const fk  = 4;
    overlay.appendChild(mk("path", {
        d: `M ${ts.x} ${ts.y} L ${te.x} ${te.y}` +
           ` M ${te.x} ${te.y} L ${te.x - tny*fk + tnx*5} ${te.y + tnx*fk + tny*5}` +
           ` M ${te.x} ${te.y} L ${te.x + tny*fk + tnx*5} ${te.y - tnx*fk + tny*5}`,
        stroke:"#e74c3c", "stroke-width":1.8, fill:"none", "stroke-linecap":"round"
    }));
}

// Draw a wooden ladder from bottomPos (lower number) → topPos (higher number)
function drawLadder(bottomPos, topPos) {
    const b = getCellCenter(bottomPos);
    const t = getCellCenter(topPos);
    const dx = t.x - b.x, dy = t.y - b.y;
    const len = Math.sqrt(dx*dx + dy*dy);
    const px = (-dy/len) * 9, py = (dx/len) * 9;    // perpendicular offset for rails

    // Two rails
    [[b.x-px, b.y-py, t.x-px, t.y-py],
     [b.x+px, b.y+py, t.x+px, t.y+py]].forEach(([x1,y1,x2,y2]) => {
        overlay.appendChild(mk("line", { x1, y1, x2, y2,
            stroke:"#7A5C1E", "stroke-width":5, "stroke-linecap":"round" }));
    });

    // Rungs (evenly spaced)
    const numRungs = Math.max(3, Math.floor(len / 26));
    for(let i = 1; i <= numRungs; i++){
        const ratio = i / (numRungs + 1);
        const mx = b.x + dx*ratio, my = b.y + dy*ratio;
        overlay.appendChild(mk("line", {
            x1: mx-px, y1: my-py, x2: mx+px, y2: my+py,
            stroke:"#9B7228", "stroke-width":3.5, "stroke-linecap":"round"
        }));
    }
}

// --- Draw ladders first (behind snakes) ---
drawLadder(4,  25);
drawLadder(21, 42);
drawLadder(28, 76);
drawLadder(51, 68);
drawLadder(72, 92);

// --- Draw snakes on top ---
drawSnake(99, 54, "#c0392b", "#7B241C");   // Red
drawSnake(95, 72, "#27ae60", "#1A7240");   // Green
drawSnake(62, 19, "#2980b9", "#1A5276");   // Blue
drawSnake(47, 26, "#E8A020", "#B07018");   // Gold
drawSnake(16,  6, "#8e44ad", "#5B2C6F");   // Purple

board.appendChild(overlay);

// ===========================
// Create Players
// ===========================

const companion = document.createElement("div");
companion.classList.add("companion");

const computer = document.createElement("div");
computer.classList.add("computer");

let companionPosition = 1;
let computerPosition = 1;
// ===========================
// Snakes Data
// ===========================
const snakes = {
    99:54,
    95:72,
    62:19,
    47:26,
    16:6
};
// ===========================
// Ladders Data
// ===========================
const ladders = {
    4:25,
    21:42,
    28:76,
    51:68,
    72:92
};
// ===========================
// Check Snake
// ===========================
const checkSnake = (position) => {
    if(snakes[position]){
        return snakes[position];
    }
    return position;
};
// ===========================
// Check Ladder
// ===========================
const checkLadder = (position) => {
    if(ladders[position]){
        return ladders[position];
    }
    return position;
};
// Place both players on Position 1
document.querySelector('[data-position="1"]').appendChild(companion);
document.querySelector('[data-position="1"]').appendChild(computer);        
const rollBtn = document.querySelector("#rollBtn");
const companionPos = document.querySelector("#companionPos");
const computerPos = document.querySelector("#computerPos");
const companionDice = document.querySelector("#companionDice");
const computerDice = document.querySelector("#computerDice");
// Generate a random dice number between 1 and 6
const rollDice = () =>{
    return Math.floor(Math.random() * 6) + 1;
}; 
// Check Winner
const checkWinner = () => {
    if(companionPosition === 100){
        localStorage.setItem("winner","Companion");
        setTimeout(() => {
            window.location.href = "Winner.html";
        },1000);
    }
    else if(computerPosition === 100){
        localStorage.setItem("winner","Computer");
        setTimeout(() => {
            window.location.href = "Winner.html";
        },1000);
    }
};
// Move Companion Token
const moveCompanion = (diceValue) => {
    if(companionPosition + diceValue <= 100){
        companion.remove();
        companionPosition += diceValue;
        // Check Snake 🐍
        companionPosition = checkSnake(companionPosition);
        // Check Ladder 🪜
        companionPosition = checkLadder(companionPosition);
        const currentCell = document.querySelector(
            `[data-position="${companionPosition}"]`
        );
        currentCell.appendChild(companion);
        companionPos.innerText = `Position : ${companionPosition}`;
        // Check Win 🏆
        if(companionPosition === 100){
            checkWinner();
        }
    }
};
const moveComputer = (diceValue) => {
    if(computerPosition + diceValue <= 100){
        computer.remove();
        computerPosition += diceValue;
        // Check Snake 🐍
        computerPosition = checkSnake(computerPosition);
        // Check Ladder 🪜
        computerPosition = checkLadder(computerPosition);
        const currentCell = document.querySelector(
            `[data-position="${computerPosition}"]`
        );
        currentCell.appendChild(computer);
        computerPos.innerText = `Position : ${computerPosition}`;
        // Check Win 🏆
        if(computerPosition === 100){
            checkWinner();
        }
    }
};
const turn = document.querySelector("#turnBox h3");
// Move Computer Token
let isPlaying = false;
rollBtn.addEventListener("click",()=>{
    // Stop multiple clicks
    if(isPlaying){
        return;
    }
    isPlaying = true;
    // Companion Turn
    turn.innerText = "Companion";
    let diceValue = rollDice();
    companionDice.innerText = `🎲 ${diceValue}`;
    moveCompanion(diceValue);
    // Computer Turn after 1 second
    setTimeout(()=>{
        turn.innerText = "Computer";
        let computerDiceValue = rollDice();
        computerDice.innerText = `🎲 ${computerDiceValue}`;
        moveComputer(computerDiceValue);
        // Unlock button and revert turn after 1 more second
        setTimeout(()=>{
            isPlaying = false;
            turn.innerText = "Companion";
        }, 1000);
    },1000);
});
// ===========================
// Restart Button
// ===========================
const restartBtn = document.querySelector("#restartBtn");
restartBtn.addEventListener("click", () => {
    // Reset positions
    companionPosition = 1;
    computerPosition = 1;
    // Reset panel
    companionPos.innerText = "Position : 1";
    computerPos.innerText = "Position : 1";
    // Reset turn
    turn.innerText = "Companion";
    // Reset dice
    companionDice.innerText = "⚀";
    computerDice.innerText = "⚀";
    // Move companion back to cell 1
    companion.remove();
    document.querySelector('[data-position="1"]').appendChild(companion);
    // Move computer back to cell 1
    computer.remove();
    document.querySelector('[data-position="1"]').appendChild(computer);
    // Enable roll button if disabled
    rollBtn.disabled = false;
    // Allow playing again
    isPlaying = false;
});