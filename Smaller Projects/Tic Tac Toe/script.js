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
console.log(player1Move.value, player2Move.value);

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

    if (resultArray[0] === resultArray[1] && resultArray[0] === resultArray[2]) {
        console.log(resultArray[0]);
    }
    else if (resultArray[3] === resultArray[4] && resultArray[3] === resultArray[5]) {
        console.log(resultArray[3]);
    }
    else if (resultArray[6] === resultArray[7] && resultArray[6] === resultArray[8]) {
        console.log(resultArray[6]);
    }
    else if (resultArray[0] === resultArray[3] && resultArray[0] === resultArray[6]) {
        console.log(resultArray[0]);
    }
    else if (resultArray[1] === resultArray[4] && resultArray[1] === resultArray[7]) {
        console.log(resultArray[1]);
    }
    else if (resultArray[2] === resultArray[5] && resultArray[2] === resultArray[8]) {
        console.log(resultArray[2]);
    }
    else if (resultArray[0] === resultArray[4] && resultArray[0] === resultArray[8]) {
        console.log(resultArray[0]);
    }
    else if (resultArray[2] === resultArray[4] && resultArray[2] === resultArray[6]) {
        console.log(resultArray[2]);
    }

}

