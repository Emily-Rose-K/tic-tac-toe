/* ------ DOM Refs ------ */

var topleft = document.querySelector('.topleft');
var topPlease = document.querySelector('.topp');
var topright = document.querySelector('.topright');
var left = document.querySelector('.left');
var middle = document.querySelector('.middle');
var right = document.querySelector('.right');
var bottomleft = document.querySelector('.bottomleft');
var bottom = document.querySelector('.bottom');
var bottomright = document.querySelector('.bottomright');
var resetButton = document.querySelector("button");
var currentScore = document.querySelector(".score");
var currentRound = document.querySelector(".round");
var playerIcon = document.querySelector("span")

/* ------ Game Logic Vars ------ */

const PLAYER1 = "vamp";
const PLAYER2 = "gar";
let turn = 0;
let activePlayer = PLAYER1;
let gameOver = false;
let player1Score = 0;
let player2Score = 0;
let vampyVamps = [];
let garGar = [];
let round = 1;



/* ------ Event Listeners ------ */

/// I put more of these bad boys in the init() function 


resetButton.addEventListener("click", reset);



/* ------ Functions ------ */
function whoseTurn(){
    if (turn % 2 === 0) {
       activePlayer = PLAYER1;
       playerIcon.innerText = "🧛🏽‍♀️"
    } else {
        activePlayer = PLAYER2;
        playerIcon.innerText = "🧄"
    }
}

function reset() {
    console.log(round);
    currentRound.innerText = "Round: " + round++;
    gameOver = false;

    init();
}

function init(){
    vampyVamps = [];
    garGar = []; 
    resetButton.disabled = true;

    topleft.addEventListener("click", markIt);
    topPlease.addEventListener("click", markIt);
    topright.addEventListener("click", markIt);

    left.addEventListener("click", markIt);
    middle.addEventListener("click", markIt);
    right.addEventListener("click", markIt);

    bottomleft.addEventListener("click", markIt);
    bottom.addEventListener("click", markIt);
    bottomright.addEventListener("click", markIt);

    removeClass();
  }


  function removeClass() {
    topleft.classList.remove("vamp", "gar");
    topPlease.classList.remove("vamp", "gar");
    topright.classList.remove("vamp", "gar");
    left.classList.remove("vamp", "gar");
    middle.classList.remove("vamp", "gar");
    right.classList.remove("vamp", "gar");
    bottomleft.classList.remove("vamp", "gar");
    bottom.classList.remove("vamp", "gar");
    bottomright.classList.remove("vamp", "gar"); 

  }

function endGame() {
    gameOver = true;
    currentScore.innerText = "Score: " + player1Score + " | " + player2Score;
    resetButton.disabled = false;
}

function markIt(e) {
    e.preventDefault();
    if (!gameOver && (e.target.classList.contains("vamp" || "gar"))) {
    } else {
        e.target.classList.add(activePlayer);
        let square =  e.currentTarget.className;
        if (activePlayer === PLAYER1){
            vampyVamps.push(square);
        } else if (activePlayer === PLAYER2){
            garGar.push(square);
        }
        checkGame();
        turn++;
        whoseTurn(turn);
    }
}

winCombo = [
    //vampyvamp wins
        ["square topleft vamp", "square topp vamp", "square topright vamp"],
        ["square left vamp", "square middle vamp", "square right vamp"],
        ["square bottomleft vamp", "square bottom vamp", "square bottomright vamp"],
        ["square topleft vamp", "square middle vamp", "square bottomright vamp"],
        ["square topleft vamp", "square left vamp", "square bottomleft vamp"],
        ["square topright vamp", "square middle vamp", "square bottomleft vamp"],
        ["square topp vamp", "square middle vamp", "square bottom vamp"],
        ["square topright vamp", "square right vamp", "square bottomright vamp"],
    //gargar wins
        ["square topleft gar", "square topp gar", "square topright gar"],
        ["square left gar", "square middle gar", "square right gar"],
        ["square bottomleft gar", "square bottom gar", "square bottomright gar"],
        ["square topleft gar", "square middle gar", "square bottomright gar"],
        ["square topright gar", "square middle gar", "square bottomleft gar"],
        ["square topright gar", "square middle gar", "square bottomleft gar"],
        ["square topp gar", "square middle gar", "square bottom vamp"],
        ["square topright gar", "square right gar", "square bottomright gar"],
]


function checkGame () {
    for(let i = 0; i < winCombo.length; i++){
        let matchComboV = 0;
        let matchComboG = 0;
        for (let j = 0; j < winCombo[i].length; j++) {
            if (vampyVamps.includes(winCombo[i][j])) {
                matchComboV++;
            }  if (matchComboV === 3) {
                player1Score++;
                endGame();
            } else if (garGar.includes(winCombo[i][j])) {
                matchComboG++;
            }   if (matchComboG === 3) {
                player2Score++;
                endGame();
            }
        }   
    }
}

