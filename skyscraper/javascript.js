// disables clicks while table is still generating and at the game over/win situations
function disableClicks() {
    document.getElementsByClassName('divTableBody')[0].style.pointerEvents = 'none';
}

// show rules div
let showRules = false;
function rules() {
    if(!showRules) {
        document.getElementById('rules').style.visibility = 'visible';
        document.getElementById('rulesButton').innerText = 'Close rules';
    } else {
        document.getElementById('rules').style.visibility = 'hidden';
        document.getElementById('rulesButton').innerText = 'Show rules';
    } showRules = !showRules;
}

// variables
let firstClick = true;

const topRow = [2, 3, 4, 5, 6, 7];
const bottomRow = [57, 58, 59, 60, 61, 62];
const leftColumn = [8, 16, 24, 32, 40, 48];
const rightColumn = [15, 23, 31, 39, 47, 55];

const tableIndex = [[9, 10, 11, 12, 13, 14],
                    [17, 18, 19, 20, 21, 22],
                    [25, 26, 27, 28, 29, 30],
                    [33, 34, 35, 36, 37, 38],
                    [41, 42, 43, 44, 45, 46],
                    [49, 50, 51, 52, 53, 54]];

const playerTable = [[0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0]];

const solution = [[5, 6, 1, 4, 3, 2],
                  [4, 1, 3, 2, 6, 5],
                  [2, 3, 6, 1, 5, 4],
                  [6, 5, 4, 3, 2, 1],
                  [1, 2, 5, 6, 4, 3],
                  [3, 4, 2, 5, 1, 6]];

// player's click
function mouseDown(id) {
    checkFirstClick();
    if(document.getElementById(id).innerText === "6") {
        document.getElementById(id).innerText = "0";
        document.getElementById(id).style.fontSize = "0";
        const index = findTableIndexFromId(id);
        playerTable[index[0]][index[1]] = 0;
    } else {
        document.getElementById(id).innerText = parseInt(document.getElementById(id).innerText) + 1;
        document.getElementById(id).style.color = "black";
        document.getElementById(id).style.fontSize = "30px";
        const index = findTableIndexFromId(id);
        playerTable[index[0]][index[1]] = parseInt(document.getElementById(id).innerText);
    } checkWin();
}

// check if it's the first click so the timer starts
function checkFirstClick() {
    if(firstClick) {
        firstClick = !firstClick;
        time = !time;
        setInterval(onGoingTimer, 1000);
    }
}

// check if playerTable is equal to the solution
function checkWin(){
    if(compareMatrix()) {
        alert("CONGRATS! YOU GOT IT!");
        updateGamesWon();
        updateBestTime();
        disableClicks();
        time = !time;
    }
}

// compare playerTable matrix to solution matrix
function compareMatrix(){
    for (let i = 0; i < solution.length; i++) {
        for (let j = 0; j < solution[0].length; j++) {
            if(playerTable[i][j] !== solution[i][j]) return false;
        }
    } return true;
}

// find index of an id on table index so it's value can be updated
function findTableIndexFromId(id) {
    for (let i = 0; i < tableIndex.length; i++) {
        for (let j = 0; j < tableIndex[0].length; j++) {
            if(tableIndex[i][j] === parseInt(id.replace("cell", ""))) return [i, j];
        }
    }
}

// color all the cells
function setupNumberCounters() {

    // top row
    for(let i = 2; i < 8; i++) {
        cellCounter(counterLeftColumn, i);
    }

    // left column
    for(let j = 8; j < 49; j+= 8) {
        cellCounter(counterTopRow, j);
    }

    // bottom row
    for(let k = 57; k < 63; k++) {
        cellCounter(counterRightColumn, k);
    }

    // right column
    for(let l = 15; l < 63; l+= 8) {
        cellCounter(counterBottomRow, l);
    }
}

// aux for method above to remove duplication
function cellCounter(counter, i){
    // 60% change to show the border counter
    if(Math.random() < 0.6) {
        counter(i);
        document.getElementById("cell" + i).style.color = "white";
        document.getElementById("cell" + i).style.fontSize = "30px";
        document.getElementById("cell" + i).style.pointerEvents = 'none';
    }
}

// aux for method above ( counter for top row )
function counterTopRow(cell) {
    let towersSeen = 1;
    let index = leftColumn.indexOf(cell);
    let bigger = solution[index][0];
    for(let i = 1; i < 6; i++){
        if (solution[index][i] > bigger){
            towersSeen++;
            bigger = solution[index][i];
        }
    } document.getElementById("cell" + cell).innerText = towersSeen.toString();
}

// aux for method above ( counter for left column )
function counterLeftColumn(cell){
    let towersSeen = 1;
    let index = topRow.indexOf(cell);
    let bigger = solution[0][index];
    for(let i = 1; i < 6; i++){
        if (solution[i][index] > bigger){
            towersSeen++;
            bigger = solution[i][index];
        }
    } document.getElementById("cell" + cell).innerText = towersSeen.toString();
}

// aux for method above ( counter for bottom row )
function counterBottomRow(cell) {
    let towersSeen = 1;
    let index = rightColumn.indexOf(cell);
    let bigger = solution[index][5];
    for(let i = 5; i >= 0; i--){
        if (solution[index][i] > bigger){
            towersSeen++;
            bigger = solution[index][i];
        }
    } document.getElementById("cell" + cell).innerText = towersSeen.toString();
}

// aux for method above ( counter for right column )
function counterRightColumn(cell) {
    let towersSeen = 1;
    let index = bottomRow.indexOf(cell);
    let bigger = solution[5][index];
    for(let i = 5; i >= 0; i--){
        if (solution[i][index] > bigger){
            towersSeen++;
            bigger = solution[i][index];
        }
    } document.getElementById("cell" + cell).innerText = towersSeen.toString();
}

// generate table
function tableGenerator() {
    randomizeTable();
    updateTable();
    setupNumberCounters();
    hits();
}

function updateTable() {
    for(let i = 0; i < solution.length; i++) {
        for(let j = 0; j < solution[0].length; j++) {
            const index = tableIndex[i][j];
            document.getElementById("cell" + index).innerText = "0";
            document.getElementById("cell" + index).style.fontSize = "0";
            document.getElementById("cell" + index).style.backgroundColor = "#6a8091";
        }
    }
}

// hits given
function hits() {
    for (let i = 0; i < 15; i++) {
        let row = Math.floor(Math.random() * 6);
        let column = Math.floor(Math.random() * 6);

        playerTable[row][column] = solution[row][column];
        document.getElementById("cell" + tableIndex[row][column]).innerText = solution[row][column];
        document.getElementById("cell" + tableIndex[row][column]).style.color = "black";
        document.getElementById("cell" + tableIndex[row][column]).style.fontSize = "30px";
        document.getElementById("cell" + tableIndex[row][column]).style.pointerEvents = 'none';
        document.getElementById("cell" + tableIndex[row][column]).style.backgroundColor = '#576c7d';
    }
}

// switch around some rows/columns so there's a new random but working solution every time
function randomizeTable() {

    for (let i = 0; i < 10; i++) {
        // switch 2 rows
        let possibilities = [0, 1, 2, 3, 4, 5];
        let index1 = Math.floor(Math.random() * 6);
        possibilities.slice(index1, 1);
        let index2 = Math.floor(Math.random() * 5);

        const row1 = solution[index1];
        solution[index1] = solution[index2];
        solution[index2] = row1;

        // switch 2 columns
        possibilities = [0, 1, 2, 3, 4, 5];
        index1 = Math.floor(Math.random() * 6);
        possibilities.slice(index1, 1);
        index2 = Math.floor(Math.random() * 5);

        let column1 = columnToArray(index1);
        let column2 = columnToArray(index2);

        changeColumn(index1, column2);
        changeColumn(index2, column1);
    }
}

function columnToArray(index) {
    let array = [];
    for (let i = 0; i < solution.length; i++) {
        array.push(solution[i][index])
    } return array;
}

function changeColumn(index, array) {
    for (let i = 0; i < solution.length; i++) {
        solution[i][index] = array[i];
    }
}

// show solution
function end() {
    for(let i = 8; i < 50; i++) {
        if(!leftColumn.includes(i)) {
            const cell = "cell" + i;
            document.getElementById(cell).style.color = "black";
            document.getElementById(cell).style.fontSize = "30px";
        }
    }
}

function gameOverFromTooMuchTimePasses() {
    alert("GAME OVER");
    time = !time;
    disableClicks();
    end();
}

// timer logic
let seconds = 1;
let minutes = 0;
let secondsToText = "";
let minutesToText = "";
let time = false;

function timeToText() {
    if (seconds < 10) secondsToText = "0" + seconds;
    else if (seconds > 9) secondsToText = seconds;
    if (minutes < 10) minutesToText = "0" + minutes;
    else if (minutes > 9) minutesToText = minutes;

    return minutesToText + ":" + secondsToText;
}

function onGoingTimer(){
    if(time) {
        document.getElementById("currentTime").innerText = timeToText();
        if (seconds === 59) {
            seconds = 0;
            minutes++;
        } else if(minutes === 59 && seconds === 59) gameOverFromTooMuchTimePasses();
        else seconds++;
    }
}

function updateGamesWon() {
    setCookie("skyscraper-games-won=", parseInt(document.getElementById("gamesWon").innerText) + 1);
    document.getElementById("gamesWon").innerText = getCookie("skyscraper-games-won=");
}

function setUpGamesWon() {
    if (getCookie("skyscraper-games-won=") === '') setCookie("skyscraper-games-won=", '0');
    document.getElementById("gamesWon").innerText = getCookie("skyscraper-games-won=");
}

function updateBestTime() {
    if(document.getElementById("bestTime").innerText === '00:00')
        setCookie("skyscraper-high-score=", document.getElementById("currentTime").innerText);
    else if(document.getElementById("currentTime").innerText < document.getElementById("bestTime").innerText) {
        setCookie("skyscraper-high-score=", document.getElementById("currentTime").innerText);
    } document.getElementById("bestTime").innerText = getCookie("skyscraper-high-score=");
}

function setUpHighScore() {
    if (getCookie("skyscraper-high-score=") === '') setCookie("skyscraper-high-score=", '00:00');
    document.getElementById("bestTime").innerText = getCookie("skyscraper-high-score=");
}

function setCookie(cookie, cookieValue) {
    document.cookie = cookie + cookieValue + ";" + "expires=Fri, 31 Dec 9999 23:59:59 GMT" + ";path=/skyscraper";
}

function getCookie(cookie) {
    const name = cookie;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        } if (c.indexOf(name) === 0)
            return (c.substring(name.length, c.length)).replace(cookie, "");
    } return "";
}