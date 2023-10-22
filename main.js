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
    cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
}

// add 'CONTROLLER' to listen to users action and set function that should manipulate the model
cardElement.addEventListener('click', function (event) {
    event.preventDefault();
    return;
    // flip card and check if two card is opened?
    //
});
