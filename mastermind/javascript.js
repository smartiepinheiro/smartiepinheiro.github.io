// variables
var cellStandardColor = 'rgb(111, 141, 175)';
var solution = randomSolution();
var numberOfTries = 0;
var rightPlace;
var wrongPlace;
var input = "";

// get user input
function getInput() {
    for (var i = 1; i < 5; i++) {
        input += document.getElementById("color" + i).style.backgroundColor.toString().charAt(0);
    }
}

// check if user chose all 4 colors for a guess
function guessIsComplete() {
    for (var i = 1; i < 5; i++) {
        if(document.getElementById("color" + i).style.backgroundColor === cellStandardColor)
            return false;
    } return true;
}

// update on screen color for a given color guess
function updateGuessedColor(color) {
    var index = checkNextOrder();
    document.getElementById(index).style.backgroundColor = color;
}

// check the next free guess space (if none update last)
function checkNextOrder() {
    for (var i = 1; i < 5; i++) {
        if(document.getElementById("color" + i).style.backgroundColor === cellStandardColor) return "color" + i;
    }
}

// set initial guess cell's color
function setColors() {
    for (var i = 1; i < 5; i++) {
        document.getElementById("color" + i).style.backgroundColor = cellStandardColor;
    }
}

// Reset to initial color if guessed space if clicked
function resetGuessedColor(button) {
    button.style.backgroundColor = cellStandardColor;
}

function updateTable() {
    updateGuessCells();
    updateRightAndWrongCells();
    setColors();
}

function getInputLetterToColor(letter) {
    if(letter === 'r') return "red";
    else if(letter === 'b') return 'blue';
    else if(letter === 'y') return 'yellow';
    else if(letter === 'g') return 'green';
    else if(letter === 'w') return 'white';
    else if(letter === 'p') return 'purple';
}

function updateGuessCells() {
    for (var i = 1; i < 5; i++) {
        var id = "guess" + numberOfTries + "color" + i;
        document.getElementById(id).style.backgroundColor = getInputLetterToColor(input[i - 1]);
    }
}

function updateRightAndWrongCells() {
    document.getElementById("guess" + numberOfTries + "right").innerText = rightPlace;
    document.getElementById("guess" + numberOfTries + "wrong").innerText = wrongPlace;
}

// MASTERMIND LOGIC _________________________________________________________________________________________________

function play() {
    if (guessIsComplete()) {
        getInput();
        numberOfTries++;
        checkWinOrGameOver();
        checkCorrectLetterPlacing();
        updateTable();
        input = "";
    } else alert("Please complete your guess.")
}

// check if the player won or exceeded the number of tries
function checkWinOrGameOver() {
    if (checkWin()) {
        alert("CONGRATS YOU GOT IT!");
        document.getElementById('guess').style.visibility = 'hidden';
    }

    else if(checkGameOver()) {
        alert("GAME OVER! The solution was " + solution);
        document.getElementById('guess').style.visibility = 'hidden';
    }
}

// check if the input is the correct solution
function checkWin() {
    return input === solution;
}

// check if the number of tries were exceeded
function checkGameOver() {
    return numberOfTries === 10;
}

// check if any letters are in the solution and on the right and later on the wrong position
function checkCorrectLetterPlacing() {
    var copyOfSolution = solution.split('');
    var copyOfInput = input.split('');
    var right = 0;

    for (var i = 0; i < 4; i++) {
        if (copyOfInput[i] === copyOfSolution[i]) {
            copyOfSolution[i] = '*';
            copyOfInput[i] = '+';
            right++;
        }
    } rightPlace = right;
    checkWrongLetterPlacing(copyOfSolution, copyOfInput);
}

// check if any letters are in the solution but on the wrong position
function checkWrongLetterPlacing(solution, input) {
    var wrong = 0;

    for (var j = 0; j < 4; j++) {
        for (var k = 0; k < 4; k++) {
            if (input[j] === solution[k] && j !== k) {
                solution[k] = '*';
                input[j] = '+';
                wrong++;
            }
        }
    } wrongPlace = wrong;
}

// random solution generator
function randomSolution() {
    var colors = ['r', 'b', 'y', 'g', 'w', 'p'];
    var solution = "";

    for (var i = 0; i < 4; i++) {
        var randomIndex = Math.floor(Math.random() * 6);
        solution += colors[randomIndex];
    } return solution;
}
