/*
 * This service will keep generating a new number/ball (till 100),
 * marking as start and finish of the game
 * 
 * The numbers will be stored in-memory for validating the Bingo! claims
*/

let serviceConstants = require('../config/game-service');
let gameStarted = false;
let numbersDrawn = [];

module.exports = function() {
    if (numbersDrawn.length === serviceConstants.MAX_BALLS && gameStarted === true) {
        // Reset the game
        gameStarted = false;
        numbersDrawn = new Array();
        return;
    }
    else if (numbersDrawn.length < serviceConstants.MAX_BALLS && gameStarted === true) {
        // Continue the game, draw the ball
        numbersDrawn.push(Math.floor((Math.random() * 100) + 1));
    }
    else if (numbersDrawn.length === 0 && gameStarted === false) {
        // Start the game
        gameStarted = true;
        numbersDrawn.push(Math.floor((Math.random() * 100) + 1));
        console.log('game started');
    }
}