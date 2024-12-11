//Initializing score as an object which takes either previous score value or reinitializes the score.
let score = JSON.parse(localStorage.getItem("score"))
        || { // this is used to avoid null value of score after (resetting, reloading and stopping) the server.
        Wins: 0,
        Losses: 0,
        Ties: 0,
    }
    console.log(score);

 //Added Event Listener for autoplay button on click
    document.querySelector('.js-autoPlay').addEventListener('click',()=>{
        autoPlay();
    })

    let isAutoPlaying = false; //Initialized the state of autoPlay
    let intervalId;
//Function of AutoPlay
    function autoPlay(){
        if(!isAutoPlaying){
            intervalId = setInterval(function(){                //frequency of autoplay moves
                const playerMove = pickComputerMove();          //automating Player Move
                playGame(playerMove);                           //Playing the game using function
            }, 1000);
            let autoPlayStatus = document.querySelector('.js-autoPlay');   //Displaying Stop autoplay option
            autoPlayStatus.innerHTML = 'Stop playing';
            if (autoPlayStatus.innerHTML === 'Stop playing'){          //Added css class for design of 'Stop autoplay'
                autoPlayStatus.classList.add('stopPlaying');
            }
            isAutoPlaying=true;                                 // setting state of autoplay as true
        }
        else{
            clearInterval(intervalId);                          //Removing frequency of autoplay moves
            document.querySelector('.js-autoPlay').classList.remove('stopPlaying');         //removing Stop autoplay design
            document.querySelector('.js-autoPlay').innerHTML = 'Auto Play';             //Resetting the button for AutoPlay
            isAutoPlaying=false;                                                //setting default state of autoplay
        }
    }

//Added Event Listener for Resetting the score on click
    document.querySelector('.js-rst-btn').addEventListener('click', ()=>{
        resetEventFunction();
    });

//Function using in reset button for event listener
    function resetEventFunction(){
        document.querySelector('.confirm-reset').innerHTML = `<p>Are you sure you want to reset the score?</p>
        <button class="reset-yes">Yes</button>
        <button class="reset-no">No</button>`;
        document.querySelector('.reset-yes').addEventListener('click',()=>{
            resetScore();
            document.querySelector('.confirm-reset').innerHTML='';
        });
        document.querySelector('.reset-no').addEventListener('click',()=>{
            document.querySelector('.confirm-reset').innerHTML='';
        });
    }

//Function that Resets Score and stores in localStorage
    function resetScore() {   //resetting wins, losses & ties to 0.
        score.Wins = 0;
        score.Losses = 0;
        score.Ties = 0;
        localStorage.setItem("score", JSON.stringify(score));       //Updating score in localStorage
        //localStorage.removeItem("score");
        output = `Score has been reset! \nWins: ${score.Wins} Losses:${score.Losses} Ties:${score.Ties}`;
        document.querySelector('.js-result').innerHTML = output;                     //Showing score on webpage
    }

    document.querySelector('.js-rock-btn').addEventListener('click',()=>{       //Event Listener for Rock on click
        playGame('Rock');
    })
    document.querySelector('.js-paper-btn').addEventListener('click',()=>{          //Event Listener for Paper on click
        playGame('Paper');
    })
    document.querySelector('.js-scissor-btn').addEventListener('click',()=>{        //Event Listener for Scissor on click
        playGame('Scissor');
    })

    const buttonElement = document.querySelectorAll('button');              //Adding Event Listener for rock, paper, scissor, reset & autoplay from Keyboard
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
            else if(event.key === 'a'){
                autoPlay();
            }
            else if(event.key === 'Backspace'){
                resetEventFunction();
            }
        });
    });

//Function that plays main game
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

        localStorage.setItem("score", JSON.stringify(score));       //Storing score in localStorage
        // Rendering output on webpage
        document.querySelector('.js-result').innerHTML = `<p>${result}</p>
            <p class="movesPlayed">Your Move: <img
                    src="images/${playerMove}.png"
                    class="move"> Computer Move: <img
                    src="images/${computerMove}.png"
                    class="move"></p>
            <p>Wins : ${score.Wins} Losses : ${score.Losses} Ties : ${score.Ties}</p>`;
    }

    //Automating computer moves
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
