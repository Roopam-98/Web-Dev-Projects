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

const playBoard = document.querySelectorAll('.container > div div');
let previousMove, currentMove;
playBoard.forEach((box) => {
    box.addEventListener('click', (event) => {
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


    })
})


function inputAudioPlay() {
    document.querySelector('audio').play();
}

function inputMove(playedMove, inputBox) {
    const inputMove = document.querySelector(`#${inputBox} span`);
    inputMove.innerText = playedMove;
    inputAudioPlay();
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

let player1Score = 0;
let player2Score = 0;
let Tie = 0;
function renderWinner(winningMove) {
    const winner = document.querySelector('.winner');
    if (winningMove === player1Move.value) {
        winner.innerText = 'Player 1 Wins!';
        player1Score++;
    }
    else if (winningMove === player2Move.value) {
        winner.innerText = 'Player 2 Wins!';
        player2Score++;
    }
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

const resetBtn = document.querySelector('.reset-btn');
resetBtn.addEventListener('click', () => {
    resetScore();
})
function resetScore() {
    player1Score = 0;
    player2Score = 0;
    Tie = 0;
    renderScore();
}