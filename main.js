// PSUEDO CODE
// 1. The game should start whenever there's a click on the card shown on screen
// 2. The countdown starts
// 3. The state ('MODEL') of the game will be represented using an array of 36 number with shuffling pairs of number 1-18
// 4. each number will represent different facial emoticons based on an object schema
// 5. ('CONTROLLER') first click on the card, the card will flip and then wait for the second card to be flipped then the hang time will start counting --> hang time for each level should also be predetermined
// 6. check if the number in the game state of the the opened card matches. If not matches setInterval === hangtime, then flip back automatically
// 7. if matches the imoticons stays opened ('VIEW')
// 8. continue until either the player found all the matches or times out or attempts been maxed out at 70
// 9. if found all match, display mssg "You Won, Next Level" and continue to next level with shorter card hang time. If no next level, display mssg "You Made It ALL!, What a GENIUS!! Your Total Score is ${}"
// 10. if not won, display mssg "You Lose!! Hit Restart Again"

// declare variables
let win;
let level;
let attempt;
let match;
let divID;
let cardIdx;
let hangtime;
let imgHref;
let score;
let timer;

// accessing the DOM element during event listener ('click')
// cache HTML element
const cardElement = document.querySelector('.card-container');
const resetElement = document.querySelector('button');
const scoreElement = document.querySelector('.score-dom');
const levelElement = document.querySelector('.level-dom');
const timerElement = document.querySelector('.countdown-dom');
const attemptElement = document.querySelector('.attempt-dom');
const matchElement = document.querySelector('.match-dom');
const h2Element = document.querySelector('h2');
// initialize the game state --> 'MODEL'

init();

function init() {
    win = undefined;
    score = 0;
    scoreElement.innerHTML = score;
    level = 1;
    // display level, attempt , and match
    levelElement.innerHTML = level;
    // set timer
    resetTimer();
    attempt = 0;
    attemptElement.innerHTML = attempt;
    match = 0;
    matchElement.innerHTML = match;
    // game init state
    divID = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    ];
    cardIdx = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 1, 2, 3,
        4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
    ];

    // divID = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    // cardIdx = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
    // divID = [1, 2, 3, 4, 5, 6];
    // cardIdx = [1, 2, 3, 1, 2, 3];

    // hang time
    hangtime = { 1: 3000, 2: 2500, 3: 2000, 4: 1500, 5: 1000, 6: 500 };
    // create a shuffling function and map to divID array
    cardState = cardRandomState();
    console.log(cardState);

    // made an object that will map cardIdx to img href
    imgHref = {
        1: '<img src="./img/emoticon1.png">',
        2: '<img src="./img/emoticon2.png">',
        3: '<img src="./img/emoticon3.png">',
        4: '<img src="./img/emoticon4.png">',
        5: '<img src="./img/emoticon5.png">',
        6: '<img src="./img/emoticon6.png">',
        7: '<img src="./img/emoticon7.png">',
        8: '<img src="./img/emoticon8.png">',
        9: '<img src="./img/emoticon9.png">',
        10: '<img src="./img/emoticon10.png">',
        11: '<img src="./img/emoticon11.png">',
        12: '<img src="./img/emoticon12.png">',
        13: '<img src="./img/emoticon13.png">',
        14: '<img src="./img/emoticon14.png">',
        15: '<img src="./img/emoticon15.png">',
        16: '<img src="./img/emoticon16.png">',
        17: '<img src="./img/emoticon17.png">',
        18: '<img src="./img/emoticon18.png">',
    };
}

// add 'CONTROLLER' to listen to users action and set function that should manipulate the model
cardElement.addEventListener('click', function (event) {
    event.preventDefault();
    if (win === false) {
        return;
    }
    // flip card and check if two card is opened?
    // get the id of the card
    const cardNumber = event.target.dataset.id;
    // check number of card being displayed, 1 allow more click, 2 wait for hang time
    console.info(cardElement);
    displayCard(cardNumber);
    checkMatch();
    checkWin();

    // check if match, matched keep displayed
});

// reinit the game when the reset button is clicked
resetElement.addEventListener('click', function (event) {
    event.preventDefault();
    init();
    h2Element.innerHTML = '';
    const cardAll = document.querySelectorAll('.card-container>div');
    for (let el of cardAll) {
        el.innerHTML = '';
        el.classList.remove('show-img');
        el.classList.remove('match');
    }
});

function cardRandomState() {
    // got this from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array// not fully understand this, but it should be working with small array.
    let shuffleCard = cardIdx.sort(() => Math.random() - 0.5);
    let cardStateObj = {};
    divID.forEach((el, idx) => {
        cardStateObj[el] = shuffleCard[idx];
    });
    return cardStateObj;
}

function displayCard(cardNumber) {
    // check if card open with exact class show-img
    cardOpen = document.querySelectorAll('.show-img:not(.match)').length;
    if (cardOpen === 0) {
        cardSelector = `[data-id="${cardNumber}"]`;
        const cell = document.querySelector(cardSelector);
        cell.classList.add('show-img');
        // below will later be replace with image href from imgHref
        cell.innerHTML = imgHref[cardNumber];
    } else if (cardOpen === 1) {
        cardSelector = `[data-id="${cardNumber}"]`;
        const cell = document.querySelector(cardSelector);
        cell.classList.add('show-img');
        // below will later be replace with image href from imgHref
        cell.innerHTML = imgHref[cardNumber];
        attempt += 1;
        // display
        attemptElement.innerHTML = attempt;
    } else if (cardOpen === 2) {
        return;
    } else if (attempt === 70) {
        return;
    } else if (win === false) {
        return;
    }
}

function checkMatch() {
    // check card with only class='show-img' if innerHTML match? then add match class, or move to returnCard function
    const cards = document.querySelectorAll('.show-img:not(.match)');
    if (cards.length === 2) {
        const card1 = cards[0];
        const card2 = cards[1];
        if (card1.innerHTML === card2.innerHTML) {
            card1.classList.add('match');
            card2.classList.add('match');
            match += 1;
            matchElement.innerHTML = match;
        } else {
            setTimeout(returnCard, hangtime[level]);
        }
    }
}

function returnCard() {
    // hangtime then remove the show-img class
    const cards = document.querySelectorAll('.show-img:not(.match)');
    const card1 = cards[0];
    const card2 = cards[1];
    card1.classList.remove('show-img');
    card1.innerHTML = '';
    card2.classList.remove('show-img');
    card2.innerHTML = '';
}

function checkWin() {
    // check if number of card with class match === 36
    const cardMatch = document.querySelectorAll('.show-img.match');
    if (cardMatch.length === cardIdx.length) {
        calcScore();
        // check level
        win = true;
        if (level === 6) {
            h2Element.innerHTML = `You Made It ALL!, What a GENIUS!! Your Total Score is ${score}`;
        } else {
            level++;
            h2Element.innerHTML = `You Won, Next Level ${level}`;
            // need to resetState for next level after 6 seconds
            setTimeout(resetState, 6000);
        }
    } else if (attempt === 70) {
        win = false;
        h2Element.innerHTML = "Sorry, You've MAXED OUT!!";
    }
}

function calcScore() {
    // score will be calc once card match === 36 and increment with each level
    const timeArr = timerElement.innerHTML.split(':');
    seconds = timeArr[0] * 60 + timeArr[1];
    score = seconds * 10 - attempt;
    if (level === 1) {
        scoreElement.innerHTML = score;
    } else {
        score = score + parseInt(scoreElement.innerHTML);
        scoreElement.innerHTML = score;
    }
}

function resetState() {
    // resetState to continue to next level
    score = score;
    // display level, attempt , and match
    levelElement.innerHTML = level;
    attempt = 0;
    attemptElement.innerHTML = attempt;
    match = 0;
    matchElement.innerHTML = match;
    resetTimer();
    win = undefined;
    // reset card innerHTML
    // remove class show-img and match
    const cardMatch = document.querySelectorAll('.show-img.match');
    for (let el of cardMatch) {
        el.innerHTML = '';
        el.classList.remove('show-img');
        el.classList.remove('match');
    }
}

function resetTimer() {
    // timer for 3 minutes and timer should stop if win = true
    minute = 1;
    second = 0;
    if (timer) {
        clearInterval(timer);
        timer = undefined;
    }
    // else {
    timer = setInterval(() => {
        if (second === 0) {
            if (minute === 0) {
                clearInterval(timer);
                h2Element.innerHTML =
                    'You Lose, Your Time is OUT!! Restart Again';
                win = false;
            } else if (win === undefined) {
                second = 59;
                minute--;
            } else if (win === true) {
                clearInterval(timer);
                return;
            }
        } else if (win === undefined) {
            second--;
        } else if (win === true) {
            clearInterval(timer);
            return;
        }

        timeString =
            minute.toString().padStart(2, '0') +
            ':' +
            second.toString().padStart(2, '0');
        timerElement.innerHTML = timeString;
    }, 1000);
    // }
}
