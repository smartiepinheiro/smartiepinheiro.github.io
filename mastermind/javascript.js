// variables
const cellStandardColor = 'rgb(111, 141, 175)';
const solution = randomSolution();
let numberOfTries = 0;
let rightPlace;
let wrongPlace;
let input = [];

// color arrays
let colorNames = ['red', 'blue', 'yellow', 'green', 'white', 'purple'];
let colorRGBs = ['rgb(255, 80, 80)', 'rgb(59, 59, 207)', 'rgb(243, 243, 102)',
    'rgb(45, 202, 52)', 'rgb(255, 255, 255)', 'rgb(150, 52, 150)'];

function getColorFromName(name) {
    console.log(name);
    for (let i = 0; i < 6; i++) {
        if(colorNames[i] === name)
            return colorRGBs[i];
    }
}

function getNameFromColor(color) {
    for (let i = 0; i < 6; i++) {
        if(colorRGBs[i] === color)
            return colorNames[i];
    }
}

// get user input
function getInput() {
    for (let i = 1; i < 5; i++) {
        input[i - 1] = getNameFromColor(document.getElementById("color" + i).style.backgroundColor);
    } console.log("input: " + input);
}

// check if user chose all 4 colors for a guess
function guessIsComplete() {
    for (let i = 1; i < 5; i++) {
        if(document.getElementById("color" + i).style.backgroundColor === cellStandardColor)
            return false;
    } return true;
}

// update on screen color for a given color guess
function updateGuessedColor(color) {
    const index = checkNextOrder();
    document.getElementById(index).style.backgroundColor = getColorFromName(color);
}

// check the next free guess space (if none update last)
function checkNextOrder() {
    for (let i = 1; i < 5; i++) {
        if(document.getElementById("color" + i).style.backgroundColor === cellStandardColor) return "color" + i;
    }
}

// set initial guess cell's color
function setColors() {
    for (let i = 1; i < 5; i++) {
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

function updateGuessCells() {
    for (let i = 1; i < 5; i++) {
        const id = "guess" + numberOfTries + "color" + i;
        document.getElementById(id).style.backgroundColor = getColorFromName(input[i - 1]);
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
        input = [];
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
    for (let i = 0; i < 4; i++) {
        if(input[i] !== solution[i])
            return false;
    } return true;
}

// check if the number of tries were exceeded
function checkGameOver() {
    return numberOfTries === 10;
}

// check if any letters are in the solution and on the right and later on the wrong position
function checkCorrectLetterPlacing() {
    const copyOfSolution = [...solution];
    const copyOfInput = [...input];
    let right = 0;

    for (let i = 0; i < 4; i++) {
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
    let wrong = 0;

    for (let j = 0; j < 4; j++) {
        for (let k = 0; k < 4; k++) {
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
    let colors = ['red', 'blue', 'yellow', 'green', 'white', 'purple'];
    let solution = [];

    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * 6);
        solution[i] = colors[randomIndex];
    } return solution;
}
