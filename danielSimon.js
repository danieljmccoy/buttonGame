let start = document.getElementById("start");
let buttons = document.getElementsByClassName("button");
let round = document.getElementById("round");
let computerScore =[];
let currentMove = 0;
let buttonsActive = false;

start.addEventListener("click", function() {
  resetGame();
  updateSequence();
});

for (let j = 0; j < buttons.length; j++) {
  buttons[j].addEventListener("click", userPlay);
}

function userPlay() {
  if (buttonsActive) {
    let buttonNumber = parseInt(this.getAttribute("data-number")); // will be one of the 0, 1, 2, 3 buttons
    if (buttonNumber === computerScore[currentMove]) { //if the button number matches what"s in the computer turn at each move.
      this.classList.add("highlight");
      setTimeout(() => {
        this.classList.remove("highlight");
      }, 500); //
      currentMove++;
      if (currentMove === computerScore.length) {
        clearTimeout();
        currentMove = 0;
        setTimeout(() => {
          updateSequence();
        }, 1000);
      }
    }
    else{
      resetGame();
    }
  }
}

let resetGame = () => {
  computerScore = [];
  currentMove = 0;
  buttonsActive = false;
  round.textContent = computerScore.length;
}

let updateSequence = () => {
  buttonsActive = false;
  computerScore.push(Math.floor(Math.random() * 4)); // push a random number of 0-3 to the computerScore.
  round.textContent = computerScore.length;
  displayCompTurn();
  buttonsActive = true;  // the only time buttons active is true is when the computers turn is done displaying (displayCompTurn() above).
}

let displayCompTurn = () => {
  buttonsActive = false;
  let i = 0;
  let displayLoop = () => {      // plus computer score ar 0, 1, 2, 3, 4, 5, 6, 7, etc etc (will always be 0-3) 
      let selector = "[data-number='" + computerScore[i] + "']";  // build up the data-attribute string to match the element at the current step (starts at the first position and returns an element, which will again be 0 through 3).
      let element = document.querySelector(selector); // light up the specific buttons.
      element.classList.add("highlight");
      setTimeout(() => {
        element.classList.remove("highlight");
      }, 800);;
      i++;
        // keep repeating the loop until the i === computerScore.length. If it's less than, keep going...
      if (i < computerScore.length) {
        setTimeout(() => {
          displayLoop();  // recurse lighting up the turns over and over if the current turn doesn"t match the computers
        }, 1000);  // the interval between the buttons lighting up.
      }
  }
  displayLoop();
}
