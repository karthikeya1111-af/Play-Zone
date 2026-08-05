document.addEventListener('DOMContentLoaded', () => {
  // Word Bank categorized
  const WORDS_BANK = {
    animals: [
      { word: 'ELEPHANT', hint: 'Largest living land mammal' },
      { word: 'KANGAROO', hint: 'Hopping marsupial from Australia' },
      { word: 'DOLPHIN', hint: 'Highly intelligent marine mammal' },
      { word: 'CHEETAH', hint: 'Fastest land animal in the world' },
      { word: 'PENGUIN', hint: 'Flightless bird living in cold climates' },
      { word: 'GIRAFFE', hint: 'Tallest living terrestrial animal' }
    ],
    movies: [
      { word: 'INCEPTION', hint: 'Sci-fi thriller about entering dreams' },
      { word: 'AVATAR', hint: 'Sci-fi epic set on the moon Pandora' },
      { word: 'GLADIATOR', hint: 'Roman general who becomes a gladiator' },
      { word: 'INTERSTELLAR', hint: 'Space travel through a wormhole' },
      { word: 'TITANIC', hint: 'Romance on a doomed ocean liner' },
      { word: 'JURASSIC', hint: 'Dinosaur theme park gone wrong' }
    ],
    tech: [
      { word: 'JAVASCRIPT', hint: 'Popular web programming language' },
      { word: 'ALGORITHM', hint: 'Set of instructions to solve a problem' },
      { word: 'DATABASE', hint: 'Organized collection of data' },
      { word: 'INTERNET', hint: 'Global network of computers' },
      { word: 'SOFTWARE', hint: 'Programs and operating information' },
      { word: 'COMPILER', hint: 'Translates high-level code to machine code' }
    ],
    sports: [
      { word: 'BASKETBALL', hint: 'Sport played with a hoop and orange ball' },
      { word: 'FOOTBALL', hint: 'Most popular team sport worldwide' },
      { word: 'BADMINTON', hint: 'Racket sport played with a shuttlecock' },
      { word: 'SWIMMING', hint: 'Water sport involving strokes' },
      { word: 'CRICKET', hint: 'Bat and ball game played between two teams' },
      { word: 'MARATHON', hint: 'Long-distance running race' }
    ],
    countries: [
      { word: 'AUSTRALIA', hint: 'Island continent country in Southern Hemisphere' },
      { word: 'PORTUGAL', hint: 'European country on the Iberian Peninsula' },
      { word: 'SINGAPORE', hint: 'Island city-state in Southeast Asia' },
      { word: 'SWITZERLAND', hint: 'Alpine nation known for mountains and watches' },
      { word: 'ARGENTINA', hint: 'South American nation known for tango' },
      { word: 'JAPAN', hint: 'Land of the Rising Sun' }
    ]
  };

  // State Variables
  let currentCategory = 'animals';
  let secretWord = '';
  let secretHint = '';
  let guessedLetters = new Set();
  let mistakes = 0;
  const maxMistakes = 6;
  let score = 0;
  let streak = 0;

  // DOM Elements
  const wordDisplay = document.getElementById('wordDisplay');
  const keyboard = document.getElementById('keyboard');
  const mistakesCount = document.getElementById('mistakesCount');
  const scoreDisplay = document.getElementById('scoreDisplay');
  const streakDisplay = document.getElementById('streakDisplay');
  const currentCategoryLabel = document.getElementById('currentCategory');
  const hintText = document.getElementById('hintText');
  const hintBtn = document.getElementById('hintBtn');
  const newWordBtn = document.getElementById('newWordBtn');
  const resetScoreBtn = document.getElementById('resetScoreBtn');

  // Modal Elements
  const resultModal = document.getElementById('resultModal');
  const modalIcon = document.getElementById('modalIcon');
  const modalTitle = document.getElementById('modalTitle');
  const modalMessage = document.getElementById('modalMessage');
  const revealedWord = document.getElementById('revealedWord');
  const modalNextBtn = document.getElementById('modalNextBtn');

  // Body Parts Array for Hangman SVG
  const bodyParts = [
    document.getElementById('part-head'),
    document.getElementById('part-body'),
    document.getElementById('part-left-arm'),
    document.getElementById('part-right-arm'),
    document.getElementById('part-left-leg'),
    document.getElementById('part-right-leg')
  ];

  // Synthesized Sound Effects via Web Audio API
  function playSound(type) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'correct') {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15); // E5
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'wrong') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
        osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === 'win') {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(554.37, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.4);
      } else if (type === 'lose') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.45);
      }
    } catch (e) {
      // Audio fallback silent
    }
  }

  // Render Keyboard A-Z
  function renderKeyboard() {
    keyboard.innerHTML = '';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    letters.forEach(letter => {
      const btn = document.createElement('button');
      btn.className = 'key-btn';
      btn.textContent = letter;
      btn.setAttribute('data-letter', letter);

      if (guessedLetters.has(letter)) {
        if (secretWord.includes(letter)) {
          btn.classList.add('correct');
        } else {
          btn.classList.add('wrong');
        }
        btn.disabled = true;
      }

      btn.addEventListener('click', () => handleGuess(letter));
      keyboard.appendChild(btn);
    });
  }

  // Render Hidden Word
  function renderWord() {
    wordDisplay.innerHTML = '';
    let isComplete = true;

    for (let char of secretWord) {
      const box = document.createElement('div');
      box.className = 'letter-box';

      if (guessedLetters.has(char)) {
        box.textContent = char;
        box.classList.add('revealed');
      } else {
        box.textContent = '';
        isComplete = false;
      }

      wordDisplay.appendChild(box);
    }

    if (isComplete && secretWord.length > 0) {
      handleWin();
    }
  }

  // Render SVG Hangman Parts
  function renderHangman() {
    bodyParts.forEach((part, index) => {
      if (index < mistakes) {
        part.classList.add('visible');
      } else {
        part.classList.remove('visible');
      }
    });

    mistakesCount.textContent = `${mistakes} / ${maxMistakes}`;
  }

  // Handle Letter Guess
  function handleGuess(letter) {
    if (guessedLetters.has(letter) || mistakes >= maxMistakes) return;

    guessedLetters.add(letter);

    if (secretWord.includes(letter)) {
      playSound('correct');
    } else {
      mistakes++;
      playSound('wrong');
    }

    renderKeyboard();
    renderWord();
    renderHangman();

    if (mistakes >= maxMistakes) {
      handleLoss();
    }
  }

  // Win Handler
  function handleWin() {
    score += 100 + (maxMistakes - mistakes) * 10;
    streak++;
    scoreDisplay.textContent = score;
    streakDisplay.textContent = `🔥 ${streak}`;
    playSound('win');

    modalIcon.textContent = '🎉';
    modalTitle.textContent = 'You Won!';
    modalMessage.textContent = 'Fantastic! You guessed the word correctly!';
    revealedWord.textContent = secretWord;
    resultModal.classList.add('active');
  }

  // Loss Handler
  function handleLoss() {
    streak = 0;
    streakDisplay.textContent = `🔥 ${streak}`;
    playSound('lose');

    modalIcon.textContent = '💀';
    modalTitle.textContent = 'Game Over';
    modalMessage.textContent = 'The hangman figure was completed!';
    revealedWord.textContent = secretWord;
    resultModal.classList.add('active');
  }

  // Start New Game Round
  function initGame() {
    guessedLetters.clear();
    mistakes = 0;
    
    // Pick random word from category
    const pool = WORDS_BANK[currentCategory] || WORDS_BANK.animals;
    const randomIndex = Math.floor(Math.random() * pool.length);
    secretWord = pool[randomIndex].word;
    secretHint = pool[randomIndex].hint;

    currentCategoryLabel.textContent = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
    hintText.textContent = 'Click "Hint" if you get stuck!';

    resultModal.classList.remove('active');

    renderWord();
    renderHangman();
    renderKeyboard();
  }

  // Category Buttons Handler
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      initGame();
    });
  });

  // Hint Button Handler
  hintBtn.addEventListener('click', () => {
    hintText.textContent = secretHint;
  });

  // New Word / Reset Handlers
  newWordBtn.addEventListener('click', initGame);
  modalNextBtn.addEventListener('click', initGame);
  resetScoreBtn.addEventListener('click', () => {
    score = 0;
    streak = 0;
    scoreDisplay.textContent = '0';
    streakDisplay.textContent = '🔥 0';
    initGame();
  });

  // Physical Keyboard Listener
  document.addEventListener('keydown', (e) => {
    const key = e.key.toUpperCase();
    if (key >= 'A' && key <= 'Z' && key.length === 1) {
      handleGuess(key);
    }
  });

  // Start initial game
  initGame();
});
