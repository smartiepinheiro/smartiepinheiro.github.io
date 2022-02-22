// disables clicks while table is still generating and at the game over/win situations
function disableClicks() {
    document.getElementsByClassName('divTableBody')[0].style.pointerEvents = 'none';
}

// show rules div
let showRules = false;
function rules() {
    if (!showRules) {
        document.getElementById('rules').style.visibility = 'visible';
        document.getElementById('rulesButton').innerText = 'Close rules';
    } else {
        document.getElementById('rules').style.visibility = 'hidden';
        document.getElementById('rulesButton').innerText = 'Show rules';
    } showRules = !showRules;
}

// variables
let firstClick = true;

const topRow = [2, 3, 4, 5, 6, 7, 8, 9];
const leftColumn = [10, 19, 28, 37, 46, 55, 64, 73];

const tableIndex = [
    [11, 12, 13, 14, 15, 16, 17, 18],
    [20, 21, 22, 23, 24, 25, 26, 27],
    [29, 30, 31, 32, 33, 34, 35, 36],
    [38, 39, 40, 41, 42, 43, 44, 45],
    [47, 48, 49, 50, 51, 52, 53, 54],
    [56, 57, 58, 59, 60, 61, 62, 63],
    [65, 66, 67, 68, 69, 70, 71, 72],
    [74, 75, 76, 77, 78, 79, 80, 81]
];

const auxTable = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

// player's click
function mouseDown(id) {
    if (document.getElementById(id).innerText === "") {
        document.getElementById(id).innerText = "x";
        document.getElementById(id).style.fontSize = "0";
        document.getElementById(id).style.backgroundColor = "rgb(50,125,63)";
    } else if (document.getElementById(id).innerText === "x") {
        document.getElementById(id).innerText = "🏕️";
        document.getElementById(id).style.fontSize = "20px";
    } else {
        document.getElementById(id).innerText = "";
        document.getElementById(id).style.backgroundColor = "#6a8091";
    } checkWin();
}

// check if the player's table is solved
function checkWin() {
    if (evaluateTable()) {
        alert("CONGRATS! YOU GOT IT!");
        updateGamesWon();
        updateBestTime();
        disableClicks();
        turnCellsAllGreenOnWin()
        time = !time;
    }
}

// check if there's 2 tents touching
function turnCellsAllGreenOnWin() {
    for (let row = 0; row < topRow.length; row++) {
        for (let column = 0; column < leftColumn.length; column++) {
            if (document.getElementById("cell" + tableIndex[row][column]).style.backgroundColor !== "rgb(50,125,63)") {
                document.getElementById("cell" + tableIndex[row][column]).style.backgroundColor = "rgb(50,125,63)";
            }
        }
    }
}

// check if the player completed the table correctly :
// there might be different ways to complete the table correctly 
// so we can't, unfortunately, simply compare the tableIndex to the beggining solution
function evaluateTable() {

    // top row
    for (let column = 0; column < topRow.length; column++) {
        let tentsSeen = 0;
        for (let row = 0; row < topRow.length; row++) {
            if (document.getElementById("cell" + tableIndex[row][column]).innerText === "🌲"
                && !hasAtLeastOneTent(row, column)) {
                return false;
            }
            else if (document.getElementById("cell" + tableIndex[row][column]).innerText === "🏕️"
                && !noSurroundingTents(row, column)) {
                return false;
            }
            else if (document.getElementById("cell" + tableIndex[row][column]).innerText === "🏕️") {
                tentsSeen++;
            }
        }

        if (tentsSeen != document.getElementById("cell" + topRow[column]).innerText) {
            return false;
        }
    }

    // left column
    for (let row = 0; row < leftColumn.length; row++) {
        let tentsSeen = 0;
        for (let column = 0; column < leftColumn.length; column++) {
            if (document.getElementById("cell" + tableIndex[row][column]).innerText === "🌲"
                && !hasAtLeastOneTent(row, column)) {
                return false;
            }
            else if (document.getElementById("cell" + tableIndex[row][column]).innerText === "🏕️"
                && !noSurroundingTents(row, column)) {
                return false;
            }
            else if (document.getElementById("cell" + tableIndex[row][column]).innerText === "🏕️") {
                tentsSeen++;
            }
        }

        if (tentsSeen != document.getElementById("cell" + leftColumn[row]).innerText) {
            return false;
        }
    }

    // if non of the previous cycles fail in means the table is completely and correctly filled
    return true;
}

// check if every tree is "shadowing" a tent
function hasAtLeastOneTent(row, column) {
    let numberOfTents = 0;

    if (tableIndex[row - 1] !== undefined
        && document.getElementById("cell" + tableIndex[row - 1][column]).innerText === "🏕️") {
        numberOfTents++;
    }

    else if (tableIndex[row][column + 1] !== undefined
        && document.getElementById("cell" + tableIndex[row][column + 1]).innerText === "🏕️") {
        numberOfTents++;
    }

    else if (tableIndex[row + 1] !== undefined
        && document.getElementById("cell" + tableIndex[row + 1][column]).innerText === "🏕️") {
        numberOfTents++;
    }

    else if (tableIndex[row][column - 1] !== undefined
        && document.getElementById("cell" + tableIndex[row][column - 1]).innerText === "🏕️") {
        numberOfTents++;
    }

    return numberOfTents > 0;
}

// generate table
function tableGenerator() {
    randomizeTentPlacement();
    hints();
    startTimer();
}

// starts the timer on page load
function startTimer() {
    setInterval(onGoingTimer, 1000);
}

// just for testing, deleting soon
function numberOfTrees() {
    let numberOfTrees = 0;
    for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
        for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
            if (document.getElementById("cell" + tableIndex[rowIndex][columnIndex]).innerText === "🌲") {
                numberOfTrees++;
            }
        }
    } return numberOfTrees;
}

// randomize a correct placement for the tents
function randomizeTentPlacement() {
    for (let i = 0; i < 12; i++) {
        let row = Math.floor(Math.random() * 8);
        let column = Math.floor(Math.random() * 8);
        if (auxTable[row][column] !== "🏕️" && noSurroundingTents(row, column)) {
            auxTable[row][column] = "🏕️";
            randomizeTreePlacement(row, column);
        } else i--;
    }
}

// check if any of the surrounding cells already have tents placed
function noSurroundingTents(row, column) {
    const variations = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

    for (let i = 0; i < variations.length; i++) {
        if (auxTable[row + variations[i][0]] !== undefined
            && auxTable[row + variations[i][0]][column + variations[i][1]] !== undefined
            && auxTable[row + variations[i][0]][column + variations[i][1]] === "🏕️") {
            return false;
        } else continue;
    } return true;
}

// like the name suggests it randomizes the placement of a tree given a tent
function randomizeTreePlacement(row, column) {
    let treeDirection = Math.floor(Math.random() * 4);

    if (treeDirection === 0) {
        if (tableIndex[row - 1] !== undefined && document.getElementById("cell" + tableIndex[row - 1][column]).innerText !== "🌲") {
            document.getElementById("cell" + tableIndex[row - 1][column]).innerText = "🌲";
            document.getElementById("cell" + tableIndex[row - 1][column]).style.pointerEvents = 'none';
            document.getElementById("cell" + tableIndex[row - 1][column]).style.backgroundColor = "rgb(50,125,63)";
        } else randomizeTreePlacement(row, column);
    }

    else if (treeDirection === 1) {
        if (tableIndex[row][column + 1] !== undefined && document.getElementById("cell" + tableIndex[row][column + 1]).innerText !== "🌲") {
            document.getElementById("cell" + tableIndex[row][column + 1]).innerText = "🌲";
            document.getElementById("cell" + tableIndex[row][column + 1]).style.pointerEvents = 'none';
            document.getElementById("cell" + tableIndex[row][column + 1]).style.backgroundColor = "rgb(50,125,63)";
        } else randomizeTreePlacement(row, column);
    }

    else if (treeDirection === 2) {
        if (tableIndex[row + 1] !== undefined && document.getElementById("cell" + tableIndex[row + 1][column]).innerText !== "🌲") {
            document.getElementById("cell" + tableIndex[row + 1][column]).innerText = "🌲";
            document.getElementById("cell" + tableIndex[row + 1][column]).style.pointerEvents = 'none';
            document.getElementById("cell" + tableIndex[row + 1][column]).style.backgroundColor = "rgb(50,125,63)";
        } else randomizeTreePlacement(row, column);
    }

    else if (treeDirection === 3) {
        if (tableIndex[row][column - 1] !== undefined && document.getElementById("cell" + tableIndex[row][column - 1]).innerText !== "🌲") {
            document.getElementById("cell" + tableIndex[row][column - 1]).innerText = "🌲";
            document.getElementById("cell" + tableIndex[row][column - 1]).style.pointerEvents = 'none';
            document.getElementById("cell" + tableIndex[row][column - 1]).style.backgroundColor = "rgb(50,125,63)";
        } else randomizeTreePlacement(row, column);
    }
}

// hits given aka white numbers on the borders
function hints() {
    for (let i = 0; i < topRow.length; i++) {

        let tentsOnColumn = numberOfTentsOnColumn(i);

        document.getElementById("cell" + topRow[i]).innerText = tentsOnColumn;
        document.getElementById("cell" + topRow[i]).style.color = "white";
        document.getElementById("cell" + topRow[i]).style.fontSize = "30px";
        document.getElementById("cell" + topRow[i]).style.pointerEvents = 'none';
        document.getElementById("cell" + topRow[i]).style.backgroundColor = 'transparent';

        let tentsOnRow = numberOfTentsOnRow(i);

        document.getElementById("cell" + leftColumn[i]).innerText = tentsOnRow;
        document.getElementById("cell" + leftColumn[i]).style.color = "white";
        document.getElementById("cell" + leftColumn[i]).style.fontSize = "30px";
        document.getElementById("cell" + leftColumn[i]).style.pointerEvents = 'none';
        document.getElementById("cell" + leftColumn[i]).style.backgroundColor = 'transparent';
    }
}

// aux of above
function numberOfTentsOnRow(row) {
    let numberOfTents = 0;
    for (let i = 0; i < leftColumn.length; i++) {
        if (auxTable[row][i] === "🏕️") {
            numberOfTents++;
        }
    } return numberOfTents;
}

// aux of above
function numberOfTentsOnColumn(column) {
    let numberOfTents = 0;
    for (let i = 0; i < topRow.length; i++) {
        if (auxTable[i][column] === "🏕️") {
            numberOfTents++;
        }
    } return numberOfTents;
}

// game over when time hits 59:59
function gameOverFromTooMuchTimePasses() {
    alert("GAME OVER");
    time = !time;
    disableClicks();
}

// beginning of the timer logic
let seconds = 1;
let minutes = 0;
let secondsToText = "";
let minutesToText = "";
let time = true;

function timeToText() {
    if (seconds < 10) secondsToText = "0" + seconds;
    else if (seconds > 9) secondsToText = seconds;
    if (minutes < 10) minutesToText = "0" + minutes;
    else if (minutes > 9) minutesToText = minutes;

    return minutesToText + ":" + secondsToText;
}

function onGoingTimer() {
    if (time) {
        document.getElementById("currentTime").innerText = timeToText();
        if (seconds === 59) {
            seconds = 0;
            minutes++;
        } else if (minutes === 59 && seconds === 59) gameOverFromTooMuchTimePasses();
        else seconds++;
    }
}

// beginning of the games won logic
function updateGamesWon() {
    localStorage.setItem("trees-and-tents-games-won", parseInt(document.getElementById("gamesWon").innerText) + 1);
    document.getElementById("gamesWon").innerText = localStorage.getItem("trees-and-tents-games-won");
}

function setUpGamesWon() {
    if (localStorage.getItem("trees-and-tents-games-won") === null) localStorage.setItem("trees-and-tents-games-won", '0');
    document.getElementById("gamesWon").innerText = localStorage.getItem("trees-and-tents-games-won");
}

// beginning of the best time logic
function updateBestTime() {
    if (document.getElementById("bestTime").innerText === '00:00')
        localStorage.setItem("trees-and-tents-high-score", document.getElementById("currentTime").innerText);
    else if (document.getElementById("currentTime").innerText < document.getElementById("bestTime").innerText) {
        localStorage.setItem("trees-and-tents-high-score", document.getElementById("currentTime").innerText);
    }
}

function setUpHighScore() {
    if (localStorage.getItem("trees-and-tents-high-score") === null) localStorage.setItem("trees-and-tents-high-score", '00:00');
    document.getElementById("bestTime").innerText = localStorage.getItem("trees-and-tents-high-score");
}