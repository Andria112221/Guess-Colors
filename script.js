const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
const gameBoard = document.querySelector('.game-board');
const scoreElement = document.getElementById('score');
let score = 0;
let flippedCards = [];
let canFlip = true;

// Create pairs of cards
const cards = [...colors, ...colors];

// Shuffle cards
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Initialize game
function initGame() {
  const shuffledCards = shuffle(cards);
  gameBoard.innerHTML = '';
  score = 0;
  scoreElement.textContent = score;

  shuffledCards.forEach((color, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.color = color;
    card.dataset.index = index;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

// Flip card
function flipCard() {
  if (!canFlip || flippedCards.length >= 2 || this.classList.contains('flipped')) return;

  this.classList.add('flipped');
  this.style.backgroundColor = this.dataset.color;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    canFlip = false;
    checkMatch();
  }
}

// Check if cards match
function checkMatch() {
  const [card1, card2] = flippedCards;
  const match = card1.dataset.color === card2.dataset.color;

  if (match) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    score++;
    scoreElement.textContent = score;
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.style.backgroundColor = '';
      card2.style.backgroundColor = '';
    }, 1000);
  }

  setTimeout(() => {
    flippedCards = [];
    canFlip = true;
    
    // Check if game is complete
    if (score === colors.length) {
      alert('Congratulations! You won! 🎉');
      setTimeout(initGame, 1000);
    }
  }, 1000);
}

// Start the game
initGame();