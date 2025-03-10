import { inputAudioPlay, winningAudioPlay } from "./sound.js";

const boxes = document.querySelectorAll('.container > div');
let player1Move = document.querySelector('.player1-movetype');
let player2Move = document.querySelector('.player2-movetype');
// console.log(player1Move.value, player2Move.value);

const winningPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
[0, 3, 6], [1, 4, 7], [2, 5, 8],
[0, 4, 8], [2, 4, 6]];

let previousMove, currentMove;
let eventHandler = (event) => {
    let inputBox = event.currentTarget.id;
    if (previousMove === 'X') {
        currentMove = 'O';
    }
    else {
        currentMove = 'X';
    }
    inputMove(currentMove, inputBox);
    previousMove = currentMove;
}


function addEvents() {
    boxes.forEach((box) => {
        box.addEventListener('click', eventHandler);
    })
}
addEvents();

function removeEvents() {
    boxes.forEach((box) => {
        box.removeEventListener('click', eventHandler)
    })
}

const newGameBtn = document.querySelector('.new-game');
newGameBtn.addEventListener('click', () => {
    boxes.forEach(box => {
        const inputBox = document.querySelector(`#${box.id}`);
        inputBox.innerText = '';
    })
    countMove = 0;
    addEvents();
});

function inputMove(playedMove, inputBox) {
    countMove++;
    inputAudioPlay();
    const inputMove = document.querySelector(`#${inputBox}`);
    inputMove.innerText = playedMove;
    let isWinner = checkingWinner();
    renderWinner(isWinner);
}

function checkingWinner() {
    let winner;
    winningPatterns.forEach((pattern) => {
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;

        if (val1 === val2 && val2 === val3) {
            winner = val1;
        }

    })
    return winner;
}



let player1Score = JSON.parse(localStorage.getItem('player1Score')) || 0;
let player2Score = JSON.parse(localStorage.getItem('player2Score')) || 0;
let Tie = JSON.parse(localStorage.getItem('Tie')) || 0;
let countMove = 0;
function renderWinner(winningMove) {
    const winner = document.querySelector('.winner');
    if (winningMove === player1Move.value) {
        winner.innerText = 'Player 1 Wins!';
        winningAudioPlay();
        removeEvents();
        player1Score++;
    }
    else if (winningMove === player2Move.value) {
        winner.innerText = 'Player 2 Wins!';
        winningAudioPlay();
        removeEvents();
        player2Score++;
    }
    else if (countMove === 9 && !winningMove) {
        winner.innerText = 'Draw Match!';
        Tie++;
        console.log(Tie);
    }
    storeScore();
    renderScore();
}

function renderScore() {
    const player1 = document.querySelector('.player1');
    const player2 = document.querySelector('.player2');
    const tie = document.querySelector('.tie');
    player1.innerText = player1Score;
    player2.innerText = player2Score;
    tie.innerText = Tie;
}

renderScore();

const resetBtn = document.querySelector('.reset-btn');
resetBtn.addEventListener('click', () => {
    player1Score = 0;
    player2Score = 0;
    Tie = 0;
    storeScore();
    renderScore();
})


function storeScore() {
    localStorage.setItem('player1Score', JSON.stringify(player1Score));
    localStorage.setItem('player2Score', JSON.stringify(player2Score));
    localStorage.setItem('Tie', JSON.stringify(Tie));
}