var cellStandardColor = 'rgb(111, 141, 175)';

// variables
var input;
var solution = randomSolution();
var numberOfTries = 0;
var rightPlace;
var wrongPlace;

// Get user input
function getInput() {
    return document.getElementById("color1").style.backgroundColor.toString().charAt(0)
        + document.getElementById("color2").style.backgroundColor.toString().charAt(0)
        + document.getElementById("color3").style.backgroundColor.toString().charAt(0)
        + document.getElementById("color4").style.backgroundColor.toString().charAt(0);
}

// Check if user chose all 4 colors for a guess
function checkIfGuessIsComplete() {
    return !(document.getElementById("color1").style.backgroundColor === cellStandardColor
        || document.getElementById("color2").style.backgroundColor === cellStandardColor
        || document.getElementById("color3").style.backgroundColor === cellStandardColor
        || document.getElementById("color4").style.backgroundColor === cellStandardColor);
}

// Update on screen color for a given color guess
function updateGuessedColor(color) {
    var index = checkNextOrder();
    document.getElementById(index).style.backgroundColor = color;
}

// Check the next free guess space (if none update last)
function checkNextOrder() {
    console.log(document.getElementById("color1").style.backgroundColor);
    if (document.getElementById("color1").style.backgroundColor === cellStandardColor)
        return 'color1';
    else if (document.getElementById("color2").style.backgroundColor === cellStandardColor)
        return 'color2';
    else if (document.getElementById("color3").style.backgroundColor === cellStandardColor)
        return 'color3';
    else if (document.getElementById("color4").style.backgroundColor === cellStandardColor)
        return 'color4';
}

// Set initial colors
function setColors() {
    document.getElementById("color1").style.backgroundColor = cellStandardColor;
    document.getElementById("color2").style.backgroundColor = cellStandardColor;
    document.getElementById("color3").style.backgroundColor = cellStandardColor;
    document.getElementById("color4").style.backgroundColor = cellStandardColor;
}

// Reset to initial color if guessed space if clicked
function resetGuessedColor(button) {
    button.style.backgroundColor = cellStandardColor;
}

// MASTERMIND LOGIC _________________________________________________________________________________________________

function play() {
    if (checkIfGuessIsComplete()) {
        input = getInput();
        numberOfTries++;
        checkCorrectLetterPlacing();
        updateTable();
        setColors();
        checkWinOrGameOver();
    } else alert("Please complete your guess.")
}

function checkWinOrGameOver() {
    if (checkWin()) {
        alert("CONGRATS YOU GOT IT!");
        document.getElementById('guess').style.visibility = 'hidden';
    }

    else if(numberOfTries === 10) {
        alert("GAME OVER! The solution was " + solution);
        document.getElementById('guess').style.visibility = 'hidden';
    }
}

// check if the input is the correct solution
function checkWin() {
    return input === solution;
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
                console.log("W solution changed: " + solution);
                console.log("W input changed: " + input)
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

// TODO change later

// colors from first letter
function getColor(letter) {
    if (letter === 'r') return 'red';
    else if (letter === 'b') return 'blue';
    else if (letter === 'y') return 'yellow';
    else if (letter === 'g') return 'green';
    else if (letter === 'w') return 'white';
    else if (letter === 'p') return 'purple';
}

// Update guesses table
function updateTable() {
    if (numberOfTries === 1)
        line1();
    else if (numberOfTries === 2)
        line2();
    else if (numberOfTries === 3)
        line3();
    else if (numberOfTries === 4)
        line4();
    else if (numberOfTries === 5)
        line5();
    else if (numberOfTries === 6)
        line6();
    else if (numberOfTries === 7)
        line7();
    else if (numberOfTries === 8)
        line8();
    else if (numberOfTries === 9)
        line9();
    else {
        line10();
    }
}

function line1() {
    document.getElementById("1").style.backgroundColor = getColor(input[0]);
    document.getElementById("2").style.backgroundColor = getColor(input[1]);
    document.getElementById("3").style.backgroundColor = getColor(input[2]);
    document.getElementById("4").style.backgroundColor = getColor(input[3]);
    document.getElementById("5").innerText = rightPlace;
    document.getElementById("6").innerText = wrongPlace;
}

function line2() {
    document.getElementById("7").style.backgroundColor = getColor(input[0]);
    document.getElementById("8").style.backgroundColor = getColor(input[1]);
    document.getElementById("9").style.backgroundColor = getColor(input[2]);
    document.getElementById("10").style.backgroundColor = getColor(input[3]);
    document.getElementById("11").innerText = rightPlace;
    document.getElementById("12").innerText = wrongPlace;
}

function line3() {
    document.getElementById("13").style.backgroundColor = getColor(input[0]);
    document.getElementById("14").style.backgroundColor = getColor(input[1]);
    document.getElementById("15").style.backgroundColor = getColor(input[2]);
    document.getElementById("16").style.backgroundColor = getColor(input[3]);
    document.getElementById("17").innerText = rightPlace;
    document.getElementById("18").innerText = wrongPlace;
}

function line4() {
    document.getElementById("19").style.backgroundColor = getColor(input[0]);
    document.getElementById("20").style.backgroundColor = getColor(input[1]);
    document.getElementById("21").style.backgroundColor = getColor(input[2]);
    document.getElementById("22").style.backgroundColor = getColor(input[3]);
    document.getElementById("23").innerText = rightPlace;
    document.getElementById("24").innerText = wrongPlace;
}

function line5() {
    document.getElementById("25").style.backgroundColor = getColor(input[0]);
    document.getElementById("26").style.backgroundColor = getColor(input[1]);
    document.getElementById("27").style.backgroundColor = getColor(input[2]);
    document.getElementById("28").style.backgroundColor = getColor(input[3]);
    document.getElementById("29").innerText = rightPlace;
    document.getElementById("30").innerText = wrongPlace;
}

function line6() {
    document.getElementById("31").style.backgroundColor = getColor(input[0]);
    document.getElementById("32").style.backgroundColor = getColor(input[1]);
    document.getElementById("33").style.backgroundColor = getColor(input[2]);
    document.getElementById("34").style.backgroundColor = getColor(input[3]);
    document.getElementById("35").innerText = rightPlace;
    document.getElementById("36").innerText = wrongPlace;
}

function line7() {
    document.getElementById("37").style.backgroundColor = getColor(input[0]);
    document.getElementById("38").style.backgroundColor = getColor(input[1]);
    document.getElementById("39").style.backgroundColor = getColor(input[2]);
    document.getElementById("40").style.backgroundColor = getColor(input[3]);
    document.getElementById("41").innerText = rightPlace;
    document.getElementById("42").innerText = wrongPlace;
}

function line8() {
    document.getElementById("43").style.backgroundColor = getColor(input[0]);
    document.getElementById("44").style.backgroundColor = getColor(input[1]);
    document.getElementById("45").style.backgroundColor = getColor(input[2]);
    document.getElementById("46").style.backgroundColor = getColor(input[3]);
    document.getElementById("47").innerText = rightPlace;
    document.getElementById("48").innerText = wrongPlace;
}

function line9() {
    document.getElementById("49").style.backgroundColor = getColor(input[0]);
    document.getElementById("50").style.backgroundColor = getColor(input[1]);
    document.getElementById("51").style.backgroundColor = getColor(input[2]);
    document.getElementById("52").style.backgroundColor = getColor(input[3]);
    document.getElementById("53").innerText = rightPlace;
    document.getElementById("54").innerText = wrongPlace;
}

function line10() {
    document.getElementById("55").style.backgroundColor = getColor(input[0]);
    document.getElementById("56").style.backgroundColor = getColor(input[1]);
    document.getElementById("57").style.backgroundColor = getColor(input[2]);
    document.getElementById("58").style.backgroundColor = getColor(input[3]);
    document.getElementById("59").innerText = rightPlace;
    document.getElementById("60").innerText = wrongPlace;
}