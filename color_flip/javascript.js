// disables right click context menu
document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
}, true);

// disables clicks while table is still generating and at the game over/win situations
function disableClicks() {
    document.getElementsByClassName('divTableBody')[0].style.pointerEvents = 'none';
}

// enable clicks after table is generated
function enableClicks() {
    document.body.style.pointerEvents = 'auto';
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

const left = [1, 8, 15, 22, 29, 36, 43];
const right = [7, 14, 21, 28, 35, 42, 49];
const up = [1, 2, 3, 4, 5, 6, 7];
const bottom = [43, 44, 45, 46, 47, 48, 49];

const topLeft = [1];
const topRight = [7];
const bottomLeft = [43];
const bottomRight = [49];

// player's click
function mouseDown(id) {
    checkFirstClick();
    generalCellUpdate(id);
    win();
}

// color all the cells
function setupCellColorAtStart() {
    for (let i = 1; i < 50; i++) {
        document.getElementById("cell" + i).style.backgroundColor = 'rgb(255, 80, 80)';
    }
}

// simulates 10 random clicks to form a new table every time
function randomStart() {
    for (let i = 0; i < 20; i++) {
        const id = Math.floor(Math.random() * 49) + 1;
        generalCellUpdate("cell" + id);
    }
}

// check if it's the first click so the timer starts
function checkFirstClick() {
    if(firstClick) {
        setTimeout("enableClicks()", 500);
        firstClick = !firstClick;
        time = !time;
        setInterval(onGoingTimer, 1000);
    }
}

// check how many bombs are adjacent to a given cell
function updateCells(aux, id) {
    switchColor("cell" + id);
    for (let i = 0; i < aux.length; i++) {
        switchColor("cell" + parseInt(id + aux[i]))
    }
}

// switch cell color
function switchColor(id) {
    if(document.getElementById(id).style.backgroundColor === 'rgb(255, 80, 80)')
        document.getElementById(id).style.backgroundColor = 'rgb(50,125,63)';
    else document.getElementById(id).style.backgroundColor = 'rgb(255, 80, 80)';
}

// loop used in various methods to update cell values
// example - method: unpinAndRestore, id: 40 (number of the cell)
function generalCellUpdate(id) {
    id = parseInt(id.replace("cell", ""));
    if (topLeft.includes(id))
        updateCells([+1, +7], id);
    else if (topRight.includes(id))
        updateCells([-1, +7], id);
    else if (bottomLeft.includes(id))
        updateCells([-7, +1], id);
    else if (bottomRight.includes(id))
        updateCells([-7, -1], id);
    else if (left.includes(id))
        updateCells([-7, +1, +7], id);
    else if (right.includes(id))
        updateCells([-7, -1, +7], id);
    else if (up.includes(id))
        updateCells([-1, +1, +7], id);
    else if (bottom.includes(id))
        updateCells([-7, -1, +1], id);
    else updateCells([-7, -1, +1, +7], id);
}

function checkWinSituation() {
    const color = document.getElementById("cell1").style.backgroundColor;
    for (let i = 2; i < 50; i++) {
        console.log(document.getElementById("cell1").style.backgroundColor);
        console.log(document.getElementById("cell2").style.backgroundColor);
        console.log(document.getElementById("cell3").style.backgroundColor);
        console.log(document.getElementById("cell4").style.backgroundColor);
        console.log(document.getElementById("cell5").style.backgroundColor);
        console.log(document.getElementById("cell6").style.backgroundColor);
        console.log(document.getElementById("cell7").style.backgroundColor);
        if(document.getElementById("cell" + i).style.backgroundColor !== color)
            return false;
    } return true;
}

function win() {
    if(checkWinSituation() === true) {
        alert("YOU JOB! YOU GOT IT!");
        time = !time;
        updateBestTime();
        disableClicks();
    }
}

function gameOverFromTooMuchTimePasses() {
    alert("GAME OVER");
    time = !time;
    disableClicks();
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
    document.cookie = "color-flip-high-score=" + cookieValue + ";" + "expires=Fri, 31 Dec 9999 23:59:59 GMT" + ";path=/color_flip";
}

function getCookie() {
    const name = 'color-flip-high-score=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        } if (c.indexOf(name) === 0)
            return (c.substring(name.length, c.length)).replace("color-flip-high-score=", "");
    } return "";
}