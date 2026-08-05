# 🎮 PlayZone - Arcade & Board Game Collection

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Responsive Design](https://img.shields.io/badge/Responsive-Mobile%20%7C%20Tablet%20%7C%20Desktop-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

**PlayZone** is a modern, responsive web application hub featuring a curated collection of 8 classic arcade, board, and puzzle games. Built with vanilla HTML5, CSS3, and modern JavaScript (ES6+), PlayZone provides instant browser-based gameplay with no installations, zero dependencies, and full touch/mobile support.

---

## 🌟 Features

- ⚡ **Instant Play**: Launch games directly inside an integrated modal launcher or open them in full-screen view.
- 📱 **Fully Responsive Layout**: Seamless experience across mobile phones, tablets, laptops, and ultra-wide desktops.
- 🔍 **Live Search & Category Filtering**: Quickly filter games by category (*Arcade*, *Strategy*, *Puzzle*, *Board Game*) or search by title/keywords.
- 🎲 **"Surprise Me" Randomizer**: Can't decide what to play? Click the random game button to pick a game instantly.
- 🎨 **Modern Design Aesthetic**: Deep crimson and warm cream color palette with polished glassmorphism cards, micro-animations, and smooth scrolling.

---

## 🕹️ Game Catalog & Manual

| Game Title | Category | Path | Description |
| :--- | :--- | :--- | :--- |
| **Whack A Mole** | Arcade | `whack-a-mole-main/` | Fast-paced reflex game. Click or tap moles as they pop up to score points before time runs out! |
| **Rock Paper Scissors** | Strategy | `RockPaperSciccior/` | Classic hand game played against an AI opponent with move counters and score tracking. |
| **Snake and Ladder** | Board Game | `SnakeAndLadder/` | Roll the dice, race across the board, climb ladders, and avoid snakes to reach space 100. |
| **Color Memory Challenge** | Memory / Puzzle | `Colors/` | Test your memory by repeating ever-growing light and sound sequences. |
| **Bomb Defusal** | Puzzle | `BombDifusal/` | Race against a ticking countdown timer to solve logic clues and defuse the explosive. |
| **Dice Roller** | Casual / Tool | `DiceRoller/` | Interactive 3D-styled virtual dice simulator for tabletop gaming sessions. |
| **Tic Tac Toe** | Strategy | `Tic Tac Toe/` | Timeless 3x3 strategy grid game for quick head-to-head matches. |
| **Hangman Challenge** | Word / Puzzle | `Hangman/` | Guess secret words letter-by-letter across 5 categories before your chances run out. |

---

## 📖 Detailed Game Rules & Controls

<details>
<summary><b>1. 🐹 Whack A Mole</b></summary>

- **Objective**: Whack as many moles as possible within the time limit.
- **Controls**: Mouse click or touch tap on moles as they emerge from holes.
- **Scoring**: +1 point per hit. Avoid clicking empty holes.
</details>

<details>
<summary><b>2. ✂️ Rock Paper Scissors</b></summary>

- **Objective**: Outsmart the computer by choosing winning moves.
- **Controls**: Click one of three buttons (Rock, Paper, or Scissors).
- **Rules**: Rock beats Scissors, Scissors beats Paper, Paper beats Rock.
</details>

<details>
<summary><b>3. 🎲 Snake and Ladder</b></summary>

- **Objective**: Be the first player to land precisely on space 100.
- **Controls**: Click **Roll Dice** button.
- **Rules**:
  - Landing on a **Ladder** climbs up to higher squares.
  - Landing on a **Snake** slides down to lower squares.
</details>

<details>
<summary><b>4. 🧠 Color Memory Challenge</b></summary>

- **Objective**: Memorize and repeat increasing color sequence patterns.
- **Controls**: Click colored buttons in the exact sequence shown.
- **Rules**: One mistake resets the round. Reach highest level possible!
</details>

<details>
<summary><b>5. 💣 Bomb Defusal</b></summary>

- **Objective**: Defuse the bomb before the timer reaches 0:00.
- **Controls**: Keypad input and wire selection.
- **Rules**: Enter correct code or cut wires in proper order based on clues.
</details>

<details>
<summary><b>6. 🎲 Dice Roller</b></summary>

- **Objective**: Roll virtual dice for tabletop, board games, or decision making.
- **Controls**: Click **Roll** or tap the dice container.
- **Features**: Animated dice rolling physics and total sum calculation.
</details>

<details>
<summary><b>7. ❌⭕ Tic Tac Toe</b></summary>

- **Objective**: Align 3 symbols (X or O) horizontally, vertically, or diagonally.
- **Controls**: Mouse click or touch tap on any open grid cell.
- **Modes**: Player vs Computer or Player vs Player.
</details>

<details>
<summary><b>8. 🔤 Hangman Challenge</b></summary>

- **Objective**: Discover the hidden word before making 6 incorrect guesses.
- **Controls**: On-screen keyboard or physical keyboard typing.
- **Categories**: Animals, Movies, Tech, Countries, Sports.
</details>

---

## 📁 Repository Structure

```
Games/
├── README.md                      # Project documentation
├── index.html                     # Main hub & game launcher page
├── style.css                      # Global design system & layout styles
├── script.js                      # Search, filter, modal player & game launcher logic
├── images/                        # Game cards icons & thumbnails
│   ├── bomb_defusal.svg
│   ├── color_memory.svg
│   ├── dice_roller.svg
│   ├── hangman.svg
│   ├── rock_paper_scissors.png
│   ├── snake_and_ladder.png
│   ├── tic_tac_toe.svg
│   └── whack_a_mole.png
├── BombDifusal/                   # Bomb Defusal Game
│   ├── index.htm
│   ├── style.css
│   └── script.js
├── Colors/                        # Color Memory Game
│   ├── index.html
│   ├── style.css
│   └── script.js
├── DiceRoller/                    # Dice Roller Game
│   ├── index.html
│   ├── style.css
│   └── script.js
├── Hangman/                       # Hangman Challenge Game
│   ├── index.html
│   ├── style.css
│   └── script.js
├── RockPaperSciccior/             # Rock Paper Scissors Game
│   ├── index.html
│   ├── style.css
│   └── script.js
├── SnakeAndLadder/                # Snake and Ladder Board Game
│   ├── index.html
│   ├── style.css
│   └── script.js
├── Tic Tac Toe/                   # Tic Tac Toe Strategy Game
│   ├── index.html
│   ├── style.css
│   └── script.js
└── whack-a-mole-main/             # Whack A Mole Arcade Game
    ├── index.html
    ├── style.css
    └── script.js
```

---

## 🚀 Quick Start / How to Run

Because PlayZone is built strictly with static web technology, no web server or build tool (`npm`, `webpack`, `vite`) is required.

### Method 1: Direct Browser Opening
1. Clone or download this repository to your local computer.
2. Open the project root folder.
3. Double-click **`index.html`** to launch PlayZone in your default browser (Chrome, Firefox, Edge, Safari).

### Method 2: Live Server (VS Code Extension)
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension (if not already installed).
3. Right-click `index.html` and select **"Open with Live Server"**.
4. Access the site at `http://127.0.0.1:5500`.

---

## 📱 Responsive Design & Compatibility

PlayZone was built from the ground up with **mobile-first responsive design principles**:

| Viewport Width | Screen Category | Layout Behavior |
| :--- | :--- | :--- |
| **> 1024px** | Desktop / Laptops | 4-column game grid, expanded navigation links |
| **768px - 1023px** | Tablets / iPads | 2-column game grid, compact search bar |
| **< 767px** | Mobile Devices | 1-column responsive card layout, mobile hamburger menu |

- **Browser Compatibility**: Fully tested on Chrome, Edge, Safari, Firefox, and mobile browsers (iOS Safari, Android Chrome).
- **Touch Friendly**: All game buttons, touch targets, and inputs meet recommended accessibility tap target sizes (min 44px x 44px).

---

## 🛠️ Technology Stack

- **Markup**: HTML5 Semantic Elements (`<header>`, `<main>`, `<article>`, `<section>`, `<footer>`)
- **Styling**: Vanilla CSS3 (CSS Grid, Flexbox, Custom Variables `--primary: #9a0002`, Transitions, Glassmorphism)
- **Scripting**: Vanilla JavaScript (ES6 Modules, Event Delegation, DOM Manipulation, Modal Iframe Injection)
- **Typography & Icons**: [Google Fonts (Outfit & Plus Jakarta Sans)](https://fonts.google.com/), [Font Awesome 6.4](https://fontawesome.com/)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Crafted with ❤️ for arcade & board game enthusiasts!
</p>
