const hintMessageElement = document.querySelector('#hint-message');
const checkButtonElement = document.querySelector('#check-button');
const guessInputElement = document.querySelector('#guess-input');
const randomNumberElement = document.querySelector('#random-number');
const livesElement = document.querySelector('#lives');
const scoreValueElement = document.querySelector('#score-value');
const highscoreValueElement = document.querySelector('#highscore-value');
const newGameElement = document.querySelector('#new-game');
const maxNumberElement = document.querySelector('#max-number');

let maxNumber = 10;
let randomNumber;
let highscore = window.localStorage.getItem('highscore') // || 0;
let score = 0;
let lives = 5;
let gameWon = false;

updateLives(lives);
generateRandomNumber();
updateMaxNumber(10);
updateHighscore(highscore);

checkButtonElement.addEventListener('click', CheckNumber);
guessInputElement.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        CheckNumber();
    }
})

function CheckNumber() {
    const myNumber = Number(guessInputElement.value);
    guessInputElement.value = '';

    if (gameWon === true) {        
        hintMessageElement.innerText = 'You won! Press New Game to continue'

        return;
    }

    if (lives === 0) {        
        hintMessageElement.innerText = 'You are out of lives! Press New Game to continue'

        return;
    }

    if (myNumber === randomNumber) {
        updateScore(score + 10);
        updateRandomNumberElement(randomNumber);
        gameWon = true;

        hintMessageElement.innerText = `Wohoo! You've nailed it!`;

    } else if (myNumber > maxNumber) {
        hintMessageElement.innerText = `Your number must be between 1 and ${maxNumber}`

    } else if (myNumber < 1) {
        hintMessageElement.innerText = 'Your number must be higher than 1'

    }

    else if (myNumber < randomNumber) {
        if (randomNumber - myNumber > 20) {
            hintMessageElement.innerText = 'Your number is WAY too small'
        } else if (randomNumber - myNumber < 5) {
            hintMessageElement.innerText = 'Your number is too small but you are getting close'
        } else {
            hintMessageElement.innerText = `Your number is too small`;
        }
        updateLives(lives - 1);


    } else if (myNumber > randomNumber) {
        if (myNumber - randomNumber > 20) {
            hintMessageElement.innerText = 'Your number is WAY too high'
        } else if (myNumber - randomNumber < 5) {
            hintMessageElement.innerText = 'Your number is too high but you are getting close'
        } else {
            hintMessageElement.innerText = `Your number is too high`;
        }
        updateLives(lives - 1);
    }

    if (lives === 0) {
        hintMessageElement.innerText = `Oh no, you ran out of lives! :( `
    }
}

newGameElement.addEventListener('click', function () {
    if (maxNumber <= 100 && gameWon === true) {
        updateMaxNumber(maxNumber + 5);
    }

    gameWon = false;
    hintMessageElement.innerText = 'Start the game by inserting first number';

    if (lives === 0) {
        updateScore(0);
        updateMaxNumber(10);
    }

    updateLives(5);
    updateRandomNumberElement('?');
    generateRandomNumber();
})


function updateScore(newScore) {
    score = newScore;
    scoreValueElement.innerText = score;

    if (score > highscore) {
        updateHighscore(score);
    }
}

function updateHighscore(newHighscore) {
    highscore = newHighscore;

    if(highscore === null) {
       highscore = 0;
    }

    highscoreValueElement.innerText = highscore;


    window.localStorage.setItem('highscore', highscore)
}

function updateLives(lifeCount) {
    lives = lifeCount;

    livesElement.innerHTML = '';

    for (let i = 1; i <= lives; i++) {
        livesElement.append(createLifeElement());
    }
}

function createLifeElement() {
    const livesLiElement = document.createElement('li');
    livesLiElement.append(createHeartElement());

    return livesLiElement;
}

function createHeartElement() {
    const iElement = document.createElement('i');
    iElement.classList.add('fa-solid', 'fa-heart');

    return iElement;
}

function updateRandomNumberElement(newValue) {
    randomNumberElement.innerText = newValue;
}

function generateRandomNumber() {
    randomNumber = 1 + Math.floor(Math.random() * maxNumber)
}

function updateMaxNumber(newMaxNumber) {
    maxNumber = newMaxNumber;
    maxNumberElement.innerText = newMaxNumber;
    maxNumberElement.classList.add('max-number-difficulty');
    setTimeout(function() {
        maxNumberElement.classList.remove('max-number-difficulty')
    }, 500)
}