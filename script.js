'use strict';

// Selecting Element
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// STARTING CONDITION

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = Number(0);
  score1El.textContent = Number(0);
  current0El.textContent = Number(0);
  current1El.textContent = Number(0);

  diceEl.style.display = 'none';
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = Number(0);
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  // Changing the BG color
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling The dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1- Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //   2- display Dice
    diceEl.style.display = 'block';
    diceEl.src = `dice-${dice}.png`;

    //   3 - Switching the active players
    if (dice !== 1) {
      // - Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Holding Current score
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if players score is >= 100
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // Remove active players class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.style.display = 'none';
      playing = false;
    } else {
      //Finish the game;
      switchPlayer();
    }
  }
});

// Resetting The game
btnNew.addEventListener('click', init);
