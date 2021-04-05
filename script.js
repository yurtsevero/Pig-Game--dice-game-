'use strict';
// global variables

let activePlayer = 0; // active player is set to player 1 ( player 0 )
let activePlayerScore = 0; // active player score is set to 0
let currentScore = 0; // current score from active player
let playing = false; // if the game is active and running
let diceActive = false; // check if the player rolled the dice

// get the player
const getPlayer = function (player) {
  return document.querySelector(`.player--${player}`);
};
// get the player score
const getScore = function (player) {
  return document.querySelector(`#score--${player}`);
};

// get the player current score
const getCurrentScore = function (player) {
  return document.querySelector(`#current--${player}`);
};
// set Active player
const setActivePlayer = function (activePlayer) {
  getPlayer(0).classList.remove('player--active');
  getPlayer(1).classList.remove('player--active');
  getPlayer(activePlayer).classList.add('player--active');
};

// reset player scores
const resetPlayerScores = function () {
  getScore(0).innerText = 0; // set player 1 score to 0
  getScore(1).innerText = 0; // set player 2 score to 0
};

// reset  player current scores
const resetCurrentScores = function () {
  getCurrentScore(0).innerText = 0;
  getCurrentScore(1).innerText = 0;
  currentScore = 0;
};
// reset game winner
const resetWinner = function () {
  getPlayer(0).classList.remove('player--winner');
  getPlayer(1).classList.remove('player--winner');
};
// highlight the dice button
const highLightButton = function (button) {
  document
    .querySelector(`.btn--${button.toString()}`)
    .classList.add('btn--active');
  setTimeout(() => {
    deHighLightButton(button);
  }, 3000);
};

// dehighlight the dice button
const deHighLightButton = function (button) {
  document.querySelector(`.btn--${button}`).classList.remove('btn--active');
};
// get the buttons
const buttons = document.querySelectorAll('.btn');

// get the score elements

const startNewGame = function () {
  activePlayer = 0;
  activePlayerScore = 0;
  currentScore = 0;
  resetWinner();
  resetPlayerScores();
  resetCurrentScores();
  setActivePlayer(activePlayer); // set the active player to player 1
  playing = true;
};

// start the game
startNewGame();

// click events for buttuns
buttons.forEach(button => {
  button.addEventListener('click', e => {
    const classes = e.target.classList;
    if (playing) {
      if (classes.contains('btn--roll')) {
        const dice = rollTheDice();
        diceActive = true;
        updateCurrentScore(dice);
      }
      if (classes.contains('btn--hold')) {
        if (!diceActive) highLightButton('roll');
        if (diceActive) {
          updatePlayerScore();
          if (!checkForWinner()) {
            resetCurrentScores();
            changeActivePlayer();
            diceActive = false;
          } else if (checkForWinner()) {
            highLightButton('new');
            playing = false;
          }
        }
      }
    } else {
      highLightButton('new');
    }
    if (classes.contains('btn--new')) {
      startNewGame();
    }
  });
});

//roll the Dice and update the Dice image
const rollTheDice = function () {
  //generate a random number between 1 and 6
  const min = 1,
    max = 6;
  //generate the number
  const randomNr = Math.floor(Math.random() * max + min);

  // create the image src based on the random nr
  const imgSrc = `dice-${randomNr}.png`;
  // select the image element
  const diceImage = document.querySelector('.dice');

  //set the image src attribute
  diceImage.src = imgSrc;

  //return the number to wheter update or clear the current player score
  return randomNr;
};

// update the current score based on the dice number
const updateCurrentScore = function (dice) {
  if (dice === 1) {
    changeActivePlayer();
    resetCurrentScores();
    return;
  }
  currentScore += dice;
  getCurrentScore(activePlayer).innerText = currentScore;
};

// check if one of the players has been reached to 100 points
const checkForWinner = function () {
  if (activePlayerScore >= 100) {
    getPlayer(activePlayer).classList.add('player--winner');
    return true;
  }
  return false;
};

// update activePlayer score based on the current score
const updatePlayerScore = function () {
  activePlayerScore = Number(getScore(activePlayer).innerText);
  activePlayerScore += currentScore;
  getScore(activePlayer).innerText = activePlayerScore;
};

// change player
const changeActivePlayer = function () {
  activePlayer = activePlayer ? 0 : 1; // toggle between active player --if activePlayer === 1 then set to 0 , if activePlayer === 0 set to 1
  setActivePlayer(activePlayer);
};
