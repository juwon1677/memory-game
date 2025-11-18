import './css/styles.css';

const cardsArray = [
  { id: 1, name: '😂' },
  { id: 1, name: '😂' },
  { id: 2, name: '🥹' },
  { id: 2, name: '🥹' },
  { id: 3, name: '😡' },
  { id: 3, name: '😡' },
  { id: 4, name: '😭' },
  { id: 4, name: '😭' },
  { id: 5, name: '😍' },
  { id: 5, name: '😍' },
  { id: 6, name: '🤯' },
  { id: 6, name: '🤯' },
  { id: 7, name: '🧐' },
  { id: 7, name: '🧐' },
  { id: 8, name: '🫥' },
  { id: 8, name: '🫥' },
];

const gameContainer = document.getElementById('gameContainer');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0; 

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCard(card) {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');
  cardElement.setAttribute('data-name', card.name);
  cardElement.addEventListener('click', flipCard);
  gameContainer.appendChild(cardElement);
}

function flipCard() {
  if (lockBoard) return;
  this.classList.add('flipped');
  this.textContent = this.getAttribute('data-name');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.getAttribute('data-name') === secondCard.getAttribute('data-name');

  if (isMatch) {
    matchedPairs++;
    disableCards();
    checkWinCondition(); 
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    firstCard.textContent = '';
    secondCard.classList.remove('flipped');
    secondCard.textContent = '';
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

function resetGame() {
  gameContainer.innerHTML = '';
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  matchedPairs = 0; // 
  shuffle(cardsArray);
  cardsArray.forEach(createCard);
}

function checkWinCondition() {
  if (matchedPairs === cardsArray.length / 2) {
    alert("Congratulations! You've matched all the pairs!");
  }
}

document.getElementById('resetButton').addEventListener('click', resetGame);

shuffle(cardsArray);
resetGame();