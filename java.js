let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;
let countDownTimerId = null;
const squares = document.querySelectorAll('.square');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');

// Function to make balloon appear in a random grid box
function randomSquare() {
  squares.forEach(square => {
    square.classList.remove('mole');
  });

  let randomSquare = squares[Math.floor(Math.random() * 12)];
  randomSquare.classList.add('mole');
  hitPosition = randomSquare.id;
}

// Function to handle mole clicks and increase score
squares.forEach(square => {
  square.addEventListener('mousedown', () => {
    if (square.id === hitPosition) {
      result++;
      score.textContent = result;
      document.getElementById('pop-sound').play(); // Play sound

      square.classList.add('pop-effect');
      setTimeout(() => square.classList.remove('pop-effect'), 300);
      hitPosition = null;
    }
  });
});

// Function to move the balloon every 500 milliseconds
function moveMole() {
  timerId = setInterval(randomSquare, 500);
}

// Countdown function for the timer
function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime === 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    alert(`Oops...Timer over! You popped ${result} balloons!`);

    // Score feedback
    if (result < 50) {
      alert('You need to improve your aim! Play Again!');
    } else if (result === 50) {
      alert('Your aim is average, we recommend more practice!');
    } else {
      alert('You have amazing aim. GOOD JOB!');
    }

    saveScore();
  }
}

// Function to start the game
function startGame() {
  result = 0; // Reset the score
  score.textContent = result; // Update the score display
  currentTime = 60; // Reset the timer
  timeLeft.textContent = currentTime; // Update the timer display

  moveMole(); // Start moving the balloon
  countDownTimerId = setInterval(countDown, 1000); // Start the countdown timer
}

// Function to end the game
function endGame() {
  clearInterval(timerId); // Stop moving the balloon
  clearInterval(countDownTimerId); // Stop the countdown timer
  alert(`Game ended! You popped ${result} balloons.`);
  saveScore(); // Save the score when the game ends
}

// Function to save the player's score to local storage
function saveScore() {
  const playerScore = { result };
  localStorage.setItem('playerScore', JSON.stringify(playerScore));
  const retrievedObject = localStorage.getItem('playerScore');
  const storedScore = JSON.parse(retrievedObject);
  console.log('Player Score is: ', storedScore);
}
