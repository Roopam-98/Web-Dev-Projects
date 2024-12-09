let score = JSON.parse(localStorage.getItem("score"))
        || { // this is used to avoid null value of score after (resetting, reloading and stopping) the server.
        Wins: 0,
        Losses: 0,
        Ties: 0,
    }
    console.log(score);

    document.querySelector('.js-autoPlay').addEventListener('click',()=>{
        autoPlay();
    })

    let isAutoPlaying = false;
    let intervalId;
    function autoPlay(){
        if(!isAutoPlaying){
            intervalId = setInterval(function(){
                const playerMove = pickComputerMove();
                playGame(playerMove);
            }, 1000);
            let autoPlayStatus = document.querySelector('.js-autoPlay');
            autoPlayStatus.innerHTML = 'Stop playing';
            if (autoPlayStatus.innerHTML === 'Stop playing'){
                autoPlayStatus.classList.add('stopPlaying');
            }
            isAutoPlaying=true;
        }
        else{
            clearInterval(intervalId);
            document.querySelector('.js-autoPlay').classList.remove('stopPlaying');
            document.querySelector('.js-autoPlay').innerHTML = 'Auto Play';
            isAutoPlaying=false;
        }
    }

    document.querySelector('.js-rst-btn').addEventListener('click', ()=>{
        resetScore();
    })
    function resetScore() {
        score.Wins = 0;
        score.Losses = 0;
        score.Ties = 0;
        localStorage.setItem("score", JSON.stringify(score));
        //localStorage.removeItem("score");
        output = `Score has been reset! \nWins: ${score.Wins} Losses:${score.Losses} Ties:${score.Ties}`;
        document.querySelector('.js-result').innerHTML = output;
    }

    document.querySelector('.js-rock-btn').addEventListener('click',()=>{
        playGame('Rock');
    })
    document.querySelector('.js-paper-btn').addEventListener('click',()=>{
        playGame('Paper');
    })
    document.querySelector('.js-scissor-btn').addEventListener('click',()=>{
        playGame('Scissor');
    })

    const buttonElement = document.querySelectorAll('button');
    buttonElement.forEach(function(value){
        value.addEventListener('keydown',(event)=>{
            if(event.key === 'r' ){
                playGame('Rock');
            }
            else if(event.key === 'p'){
                playGame('Paper');
            }
            else if(event.key === 's'){
                playGame('Scissor');
            }
        })
    })


    function playGame(playerMove) {
        const computerMove = pickComputerMove();
        let result = '';

        if (playerMove === 'Rock') {  //Code result for rock
            if (computerMove === 'Rock') {
                result = 'Draw Match!';
                score.Ties++;
            } else if (computerMove === 'Scissor') {
                result = 'You won!';
                score.Wins++;
            } else if (computerMove === 'Paper') {
                result = 'Computer won!';
                score.Losses++;
            }
        } else if (playerMove === 'Paper') { //Code result for paper
            if (computerMove === 'Rock') {
                result = 'You won!';
                score.Wins++;
            } else if (computerMove === 'Scissor') {
                result = 'Computer won!';
                score.Losses++;
            } else if (computerMove === 'Paper') {
                result = 'Draw Match!';
                score.Ties++;
            }
        } else { //Code result for scissor
            if (computerMove === 'Rock') {
                result = 'Computer won!';
                score.Losses++;
            } else if (computerMove === 'Scissor') {
                result = 'Draw Match!';
                score.Ties++;
            } else if (computerMove === 'Paper') {
                result = 'You won!';
                score.Wins++;
            }
        }

        localStorage.setItem("score", JSON.stringify(score));
        output = `${result} \nYou picked ${playerMove}. \nComputer picked ${computerMove}. \nScore -`;
        document.querySelector('.js-result').innerHTML = `<p>${result}</p>
            <p class="movesPlayed">Your Move: <img
                    src="images/${playerMove}.png"
                    class="move"> Computer Move: <img
                    src="images/${computerMove}.png"
                    class="move"></p>
            <p>Wins : ${score.Wins} Losses : ${score.Losses} Ties : ${score.Ties}</p>`;
    }

    function pickComputerMove() {
        const randomNumber = Math.random();

        if (randomNumber >= 0 && randomNumber < 1 / 3) {
            computerMove = 'Rock';
        } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
            computerMove = 'Paper';
        } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
            computerMove = 'Scissor';
        }
        return computerMove;
    }
