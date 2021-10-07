var guessStatus = document.getElementById("status");
var messageGuesses = document.getElementById("resultNofGuesses");
var resultGuessedNo = document.getElementById("resultGuessedNo");
var button = document.getElementById("button");

var answer = Math.floor(Math.random() * 20) + 1;

console.log("number", answer);

var noOfGuesses = 0;
var guessedNums = []; //

function guessTheNumber() {
  var input = document.getElementById("input").value;
  if (input < 1 || input > 20) {
    alert("Please enter a number between 1 and 100");
  } else {
    guessedNums.push(input);
    noOfGuesses++;

    if (input < answer) {
      guessStatus.textContent = "Your guess is too low.";
      messageGuesses.textContent = "No. of guesses: " + noOfGuesses;
      resultGuessedNo.textContent = "Guesses numbers are:" + guessedNums;
    } else if (input < answer + 3 && input > answer) {
      guessStatus.textContent = "You're getting close!.";
      messageGuesses.textContent = "No. of guesses: " + noOfGuesses;
      resultGuessedNo.textContent = "Guesses numbers are:" + guessedNums;
    } else if (input > answer - 3 && input < answer) {
      console.log("You're getting close!.");
      guessStatus.textContent = "You're getting close!.";
      messageGuesses.textContent = "No. of guesses: " + noOfGuesses;
      resultGuessedNo.textContent = "Guesses numbers are:" + guessedNums;
    } else if (input > answer) {
      guessStatus.textContent = "Your guess is too high.";
      messageGuesses.textContent = "No. of guesses: " + noOfGuesses;
      resultGuessedNo.textContent = "Guesses numbers are:" + guessedNums;
    } else if (input == answer) {
      guessStatus.textContent = "Bravo! You are correct!";
      messageGuesses.textContent = "The number was " + answer;
      resultGuessedNo.textContent =
        "You guessed it in " + noOfGuesses + " guesses.";
      button.disabled = true;
    }
  }
}

window.addEventListener("keydown", function (event) {
  if (isNaN(event.key)) {
    alert("Please enter a number!")
    window.location.reload();
  }
});

window.onload = function () {
  document.getElementById('input').value = '';
}