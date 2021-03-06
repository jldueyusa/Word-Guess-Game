// to launch in heroku create the composer.json file by running touch composer.json and add {}
// then run touch index.php
// enter this into that file   <?php include_once("index.html"); ?>

// my array of words
var selectableWords = [
    "ratt",
    "warrant",
    "poison",
    "kiss",
    "cinderella",
    "whitesnake",
    "dokken"

];


const maxTries = 10;            // Maximum number of tries player 

var guessedLetters = [];        // Stores the letters guessed
var currentWordIndex;           // Index current word 
var guessingWord = [];          // word we build to match the current word
var remainingGuesses = 0;       // number of remaining guesses
var gameStarted = false;        // Game has started
var hasFinished = false;        // popup 'press any key to try again'     
var wins = 0;                   // number of wins

// Reset our game variables
function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;

    // Use Math.floor to round the random number down to the nearest whole.
    currentWordIndex = Math.floor(Math.random() * (selectableWords.length));

    // Clear out arrays
    guessedLetters = [];
    guessingWord = [];

    
    console.log(selectableWords[currentWordIndex])
    // Guessing word and clear it out
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }
    // Hide game over and win images/text
    document.getElementById("pressKeyTryAgain").style.cssText = "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";




    // Show display
    updateDisplay();
};

resetGame();
document.onkeyup = function (event) {
    // If we finished a game, dump one keystroke and reset.
    if (hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        // Check to make sure a-z was pressed.
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};











//  Updates the display on the HTML Page
function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    if (remainingGuesses <= 0 && gameStarted === true && hasFinished === false ) {
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        hasFinished = true;
    }
};

function checkWin() {
    console.log(guessingWord)
    if (guessingWord.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        wins++;
        hasFinished = true;
    }
};

function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }

        // Make sure we didn't use this letter yet
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }

    updateDisplay();
    checkWin();
};



// This function takes a letter and finds all instances of 
// appearance in the string and replaces them in the guess word.
function evaluateGuess(letter) {
    // Array to store positions of letters in string
    var positions = [];

    // Loop through word finding all instances of guessed letter, store the indicies in an array.
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        if (selectableWords[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    // if there are no indicies, remove a guess and update the hangman image
    if (positions.length <= 0) {
        remainingGuesses--;
        // updateHangmanImage();
    } else {
        // Loop through all the indicies and replace the '_' with a letter.
        for (var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};










