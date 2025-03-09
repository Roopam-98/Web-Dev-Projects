const soundBtn = document.querySelector('.sound');
soundBtn.addEventListener('click', () => {
    const soundState = document.querySelector('.fa-solid');
    if (soundState.classList[1] === 'fa-volume-high') {
        soundBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
    }
    else {
        soundBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
    }
})



let player1Move, player2Move;
player1Move = document.querySelector('.player1-movetype');
player2Move = document.querySelector('.player2-movetype');
// console.log(player1Move.value, player2Move.value);

if (player1Move === 'Computer') {
    if (player1Move) { }
}

let eventHandler = (event) => {
    let inputBox = event.currentTarget.id;
    if (previousMove === 'X') {
        currentMove = 'O';
        inputMove(currentMove, inputBox);
        previousMove = currentMove;
    }
    else {
        currentMove = 'X';
        inputMove(currentMove, inputBox);
        previousMove = currentMove;
    }
}

const playBoard = document.querySelectorAll('.container > div div');
let previousMove, currentMove;

function addEvents() {
    playBoard.forEach((box) => {
        box.addEventListener('click', eventHandler)
    })
}
addEvents();

function removeEvents() {
    playBoard.forEach((box) => {
        box.removeEventListener('click', eventHandler)
    })
}

const newGameBtn = document.querySelector('.new-game');
newGameBtn.addEventListener('click', () => {
    playBoard.forEach(box => {
        const inputBox = document.querySelector(`#${box.id} span`);
        inputBox.innerText = '';
    })
    addEvents();
});

function inputAudioPlay() {
    try {
        let audio = new Audio("./game-bonus-2-294436.mp3");
        audio.play();
    }
    catch (err) {
        console.log(err);
    }

}


function inputMove(playedMove, inputBox) {
    inputAudioPlay();
    const inputMove = document.querySelector(`#${inputBox} span`);
    inputMove.innerText = playedMove;
    checkingWinner();
}

function checkingWinner() {
    let resultArray = [];
    const valArray = document.querySelectorAll('.container > div div');
    valArray.forEach((value) => {
        let boxText;
        if (value.innerText) {
            boxText = value.innerText;
            resultArray.push(boxText);
        }
        else {
            boxText = " ";
            resultArray.push(boxText);
        }

    })

    let winningMove = checkWinningConditions(resultArray);
    renderWinner(winningMove);


}


function checkWinningConditions(resultArray) {
    if (resultArray[0] === resultArray[1] && resultArray[0] === resultArray[2]) {
        return resultArray[0];
    }
    else if (resultArray[3] === resultArray[4] && resultArray[3] === resultArray[5]) {
        return resultArray[3];
    }
    else if (resultArray[6] === resultArray[7] && resultArray[6] === resultArray[8]) {
        return resultArray[6];
    }
    else if (resultArray[0] === resultArray[3] && resultArray[0] === resultArray[6]) {
        return resultArray[0];
    }
    else if (resultArray[1] === resultArray[4] && resultArray[1] === resultArray[7]) {
        return resultArray[1];
    }
    else if (resultArray[2] === resultArray[5] && resultArray[2] === resultArray[8]) {
        return resultArray[2];
    }
    else if (resultArray[0] === resultArray[4] && resultArray[0] === resultArray[8]) {
        return resultArray[0];
    }
    else if (resultArray[2] === resultArray[4] && resultArray[2] === resultArray[6]) {
        return resultArray[2];
    }
}

function winningAudioPlay() {
    try {
        let audio = new Audio("./level-win-6416.mp3");
        audio.play();
    }
    catch (err) {
        console.log(err);
    }
}

let player1Score = JSON.parse(localStorage.getItem('player1Score')) || 0;
let player2Score = JSON.parse(localStorage.getItem('player2Score')) || 0;
let Tie = JSON.parse(localStorage.getItem('Tie')) || 0;
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
    resetScore();
})
function resetScore() {
    player1Score = 0;
    player2Score = 0;
    Tie = 0;
    storeScore();
    renderScore();
}

function storeScore() {
    localStorage.setItem('player1Score', JSON.stringify(player1Score));
    localStorage.setItem('player2Score', JSON.stringify(player2Score));
    localStorage.setItem('Tie', JSON.stringify(Tie));
}