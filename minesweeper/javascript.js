// disables right click context menu
document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
}, true);

// checks if the user used the right or left click and acts accordingly
function mouseDown(e, id) {
    e = e || window.event;
    switch (e.which) {
        case 1:
            leftClick(id);
            break;
        case 3:
            rightClick(id);
            break;
    }
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
let bombs = [];
let pins = [];
let pinsLeft = 20;
let firstClick = true;

const left = [1, 13, 25, 37, 49, 61, 73, 85, 97, 109, 121, 133];
const right = [12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 132, 144];
const up = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const bottom = [133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144];

const topLeft = [1];
const topRight = [12];
const bottomLeft = [133];
const bottomRight = [144];


// check if it's the first click so the timer starts
function checkFirstClick() {
    if(firstClick) {
        firstClick = !firstClick;
        time = !time;
        setInterval(onGoingTimer, 1000);
    }
}

// left click action
function leftClick(id) {
    checkFirstClick();
    gameOver(id);
    whitespace(id);
    showCell(id);
    win();
}

// double click action
function doubleClick(id) {
    const text = document.getElementById(id).innerText;
    if(text !== "💣") {
        generalCellUpdate(circleCheck, parseInt(id.replace("cell", "")), id);
    }
}

// little aux for the method above
function circleCheck(aux, i) {
    i = i.replace("cell", "");
    let bombsFound = [];
    for (let j = 0; j < aux.length; j++) {
        if(document.getElementById("cell" + (parseInt(i) + aux[j])).innerText === "")
            leftClick("cell" + (parseInt(i) + aux[j]));
        else if (document.getElementById("cell" + (parseInt(i) + aux[j])).innerText !== "💣")
            showCell("cell" + (parseInt(i) + aux[j]));
        else bombsFound.push("cell" + (parseInt(i) + aux[j]));
    } if(bombsFound.length > 0) gameOverFromDoubleClick(bombsFound);
}

// right click action
function rightClick(id) {
    checkFirstClick();
    if (pinsLeft > 0) {
        if (document.getElementById(id).innerText !== "📌" && document.getElementById(id).style.backgroundColor !== 'lightgrey') {
            document.getElementById(id).innerText = "📌";
            document.getElementById(id).style.fontSize = '14px';
            document.getElementById(id).style.backgroundColor = 'lightgrey';
            pins.push(id);
            pinsLeft--;
        } else if (document.getElementById(id).innerText === "📌") reversePin(id);
    } else if (document.getElementById(id).innerText === "📌") reversePin(id);
    document.getElementById('pinsLeftNumber').innerText = pinsLeft.toString();
    win();
}

// little aux for the method above
function reversePin(id) {
    unpin(id.replace("cell", ""));
    pins.splice(pins.indexOf(id), 1);
    pinsLeft++;
}

// randomize bombs and place a bomb icon on all those cells
function generateBombs() {
    randomizeBombs();
    for (let i = 0; i < 20; i++) {
        document.getElementById(bombs[i]).innerText = "💣";
    } setCells();
}

// generate random bomb placement and hold that id values in bombs[]
function randomizeBombs() {
    for (let i = 0; i < 20; i++) {
        const randomIndex = Math.floor(Math.random() * 144) + 1;
        if (!bombs.includes('cell' + randomIndex))
            bombs[i] = 'cell' + randomIndex;
        else i--;
    }
}

// update non bomb cell with the correspondent number of adjacent bombs
function setCells() {
    for (let i = 1; i < 145; i++) {
        if (document.getElementById("cell" + i).innerText !== "💣")
            generalCellUpdate(updateCells, i, i);
    }
}

// check how many bombs are adjacent to a given cell
function updateCells(aux, i) {
    let bombsFound = 0;
    for (let j = 0; j < aux.length; j++) {
        if (bombs.includes("cell" + (i + aux[j])))
            bombsFound++;
    } if(bombsFound === 0) document.getElementById("cell" + i).innerText = "";
    else document.getElementById("cell" + i).innerText = bombsFound.toString();
}

// game over by clicking on a bomb
function gameOver(id) {
    if (document.getElementById(id).innerText === "💣") {
        document.getElementById(id).innerText = '💥';
        alert("GAME OVER");
        end();
        time = !time;
    }
}

function gameOverFromDoubleClick(bombsFound) {
    for (let i = 0; i < bombsFound.length; i++) {
        document.getElementById(bombsFound[i]).innerText = '💥';
    } alert("GAME OVER");
    end();
}

// win by either pinning all the bombs or left clicking on all non bomb cells
function win() {
    if (bombs.every(e => pins.includes(e)) || allNonBombCellsClicked()) {
        alert("GOOD JOB! YOU GOT IT!");
        updateBestTime();
        end();
        time = !time;
    }
}

// check if all non bomb cells where clicked
function allNonBombCellsClicked() {
    for (let i = 1; i < 145; i++) {
        if (document.getElementById("cell" + i).innerText !== "💣" && allPinsRight() &&
            document.getElementById("cell" + i).style.backgroundColor !== 'lightgrey')
            return false;
    } return true;
}

// check if all the current placed pins are correct
function allPinsRight() {
    for (let i = 0; i < pins; i++) {
        if(!bombs.includes(pins[i])) return false;
    } return true;
}

// if win() or gameOver() are triggered show all of the cells content
function end() {
    for (let i = 1; i < 145; i++) {
        document.getElementById("cell" + i).style.fontSize = '14px';
    } incorrectPins();
    // disable clicks inside table
    document.getElementsByClassName('divTableBody')[0].style.pointerEvents = 'none';
}

// cascade effect when clicking on a '0' cell
function whitespace(id) {
    const i = id.replace("cell", "");
    if (document.getElementById(id).innerText === '') {
        showCell(id);
        generalCellUpdate(whitespaceUpdateCells, parseInt(i), i);
    }
}

// addon for cascade effect where it finds all '0's adjacent or, if no more '0's adjacent, shows the non bomb cell next to it
function whitespaceUpdateCells(aux, id) {
    let index = id;
    for (let i = 0; i < aux.length; i++) {
        index = "cell" + (parseInt(id.replace("cell", "")) + aux[i]);

        if (document.getElementById(index).innerText === '' && document.getElementById(index).style.color !== 'black') {
            showCell(index);
            whitespace(index);
        } else if (document.getElementById(index).innerText !== "💣" && document.getElementById(index).style.color !== 'black')
            showCell(index);
    }
}

// show clicked or triggered cell
function showCell(id) {
    document.getElementById(id).style.color = 'black';
    document.getElementById(id).style.fontSize = '14px';
    document.getElementById(id).style.backgroundColor = 'lightgrey';
}

// hide cell
function hideCell(id) {
    document.getElementById(id).style.fontSize = '0';
    document.getElementById(id).style.backgroundColor = '#6a8091';
}

// unpin pinned cell and restore it's value
function unpin(i) {
    if (bombs.includes("cell" + i)) document.getElementById("cell" + i).innerText = "💣";
    else generalCellUpdate(unpinAndRestore, i, "cell" + i);
    hideCell("cell" + i);
}

// little aux for the method above
function unpinAndRestore(aux, id) {
    let bombCount = 0;
    for (let j = 0; j < aux.length; j++) {
        const i = parseInt(id.replace("cell", ""));
        if (bombs.includes("cell" + (i + aux[j])))
            bombCount++;
    } if (bombCount === 0) document.getElementById(id).innerText = "";
    else document.getElementById(id).innerText = bombCount.toString();
}

// loop used in various methods to update cell values
// example - method , id: cell8 , i: 8
function generalCellUpdate(method, id, i) {
    id = parseInt(id);
    if (topLeft.includes(id))
        method([+1, +12, +13], i);
    else if (topRight.includes(id))
        method([-1, +11, +12], i);
    else if (bottomLeft.includes(id))
        method([-12, -11, +1], i);
    else if (bottomRight.includes(id))
        method([-13, -12, -1], i);
    else if (left.includes(id))
        method([-12, -11, +1, +12, +13], i);
    else if (right.includes(id))
        method([-13, -12, -1, +11, +12], i);
    else if (up.includes(id))
        method([-1, +1, +11, +12, +13], i);
    else if (bottom.includes(id))
        method([-13, -12, -11, -1, +1], i);
    else method([-13, -12, -11, -1, +1, +11, +12, +13], i);
}

// shows incorrect pins at the end of the game
function incorrectPins() {
    for (let i = 0; i < pins.length; i++) {
        if (!bombs.includes(pins[i]))
            document.getElementById(pins[i]).innerText = '❌';
    }
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
        } else seconds++;
    }
}

function updateBestTime() {
    if(document.getElementById("bestTime").innerText === '00:00')
        setCookie(document.getElementById("currentTime").innerText);
    else if(document.getElementById("currentTime").innerText < document.getElementById("bestTime").innerText) {
        setCookie(document.getElementById("currentTime").innerText);
    } document.getElementById("bestTime").innerText = getCookie();
}

function setUpHighScore() {
    if (getCookie() === '') setCookie('00:00');
    document.getElementById("bestTime").innerText = getCookie();
}

function setCookie(cookieValue) {
    document.cookie = "highScore=" + cookieValue + ";" + "expires=Fri, 31 Dec 9999 23:59:59 GMT" + ";path=/";
}

function getCookie() {
    const name = 'highScore=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        } if (c.indexOf(name) === 0)
            return (c.substring(name.length, c.length)).replace("highScore=", "");
    } return "";
}