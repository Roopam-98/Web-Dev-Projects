const soundBtn = document.querySelector('.sound');
soundBtn.addEventListener('click', () => {
    const soundState = document.querySelector('.fa-solid');
    if (soundState.classList[1] === 'fa-volume-high') {
        soundBtn.innerHTML = `<i class="fa-solid fa-volume-xmark muted"></i>`;
    }
    else {
        soundBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
    }
})


export function inputAudioPlay() {
    const muteState = checkIfMuted();
    if (!muteState) {
        try {
            let audio = new Audio("./game-bonus-2-294436.mp3");
            audio.play();
        }
        catch (err) {
            console.log(err);
        }
    }

}

function checkIfMuted() {
    const mutedBtn = document.querySelector('.muted') || false;
    if (mutedBtn) return true;
    else return false;
}

export function winningAudioPlay() {
    const muteState = checkIfMuted();
    if (!muteState) {
        try {
            let audio = new Audio("./level-win-6416.mp3");
            audio.play();
        }
        catch (err) {
            console.log(err);
        }
    }
}