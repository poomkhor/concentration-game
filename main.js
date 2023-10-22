console.log('This is working!');

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

// accessing the DOM element during event listener ('click')
// cache HTML element
const cardElement = document.querySelector('.card-container');
const resetElement = document.querySelector('button');

// initialize the game state --> 'MODEL'

init();

function init() {
    win = undefined;
    level = 1;
    attempt = 0;
    match = 0;
    // game init state
    divID = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    ];
    cardIdx = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 1, 2, 3,
        4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
    ];
    // hang time
    hangtime = { 1: 3, 2: 2.5, 3: 2, 4: 1.5, 5: 1, 6: 0.5 };
    // create a shuffling function and map to divID array
    cardState = cardRandomState();
    console.info(cardState);
    // made an object that will map cardIdx to img href
    imgHref = {};
}

// add 'CONTROLLER' to listen to users action and set function that should manipulate the model
cardElement.addEventListener('click', function (event) {
    event.preventDefault();
    // flip card and check if two card is opened?
    // get the id of the card
    const cardNumber = event.target.dataset.id;
    // check number of card being displayed, 1 allow more click, 2 wait for hang time
    displayCard(cardNumber);
    // check if match, matched keep displayed
});

function cardRandomState() {
    // got this from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array// not fully understand this, but it should be working with small array.
    let shuffleCard = cardIdx.sort(() => Math.random() - 0.5);
    // console.log(shuffleCard);
    let cardStateObj = {};
    divID.forEach((el, idx) => {
        cardStateObj[el] = shuffleCard[idx];
    });
    return cardStateObj;
}

function displayCard(cardNumber) {
    // check if card open
    cardOpen = document.querySelectorAll('.show-img').length;
    if ((cardOpen - match * 2) % 2 === 1)
        // open card
        // cardInt = parseInt(cardNumber);
        cardSelector = `[data-id="${cardNumber}"]`;
    const cell = document.querySelector(cardSelector);
    cell.classList.add('show-img');
    cell.innerHTML = cardState[cardNumber];
    console.info(cell);
    console.info(cardElement);
}

function checkMatch() {}
