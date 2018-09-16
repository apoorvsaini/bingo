/*
 * This service will keep generating a new number/ball (till 100),
 * marking as start and finish of the game
 * 
 * The numbers will be stored in-memory for validating the Bingo! claims
*/

let serviceConstants = require('../config/game-service');
let gameStarted = false;
let numbersDrawn = [];

module.exports = function(io) {
    if (numbersDrawn.length === serviceConstants.MAX_BALLS && gameStarted === true) {
        // Reset the game
        gameStarted = false;
        numbersDrawn = new Array();
        console.log('game stopped');
        return;
    }
    else if (numbersDrawn.length < serviceConstants.MAX_BALLS && gameStarted === true) {
        // Continue the game, draw the ball
        let newNumber = Math.floor((Math.random() * 100) + 1);
        io.emit('ball', { ball: newNumber });
        numbersDrawn.push(newNumber);
    }
    else if (numbersDrawn.length === 0 && gameStarted === false) {
        // Start the game
        gameStarted = true;
        let newNumber = Math.floor((Math.random() * 100) + 1);
        numbersDrawn.push(newNumber);
        io.emit('ball', { ball: newNumber });
        console.log('game started');
    }
}