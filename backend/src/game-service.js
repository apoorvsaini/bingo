/*
 * This service will keep generating a new number/ball (till 100),
 * marking as start and finish of the game
 * 
 * The numbers will be stored in mongodb for validating the Bingo! claims
 * TODO: Last 5 balls should not be the same
*/

let serviceConstants = require('../config/game-service');
const mongo = require('./mongo');

let gameStarted = false;
let numbersDrawn = [];

module.exports = function(io) {
    if (numbersDrawn.length === serviceConstants.MAX_BALLS && gameStarted === true) {
        // Reset the game
        gameStarted = false;
        console.log('game stopped');
        return;
    }
    else if (numbersDrawn.length < serviceConstants.MAX_BALLS && gameStarted === true) {
        // Continue the game, draw the ball
        let newNumber = Math.floor((Math.random() * 100) + 1);
        let ballObj = { ball: newNumber, time: Date.now() };
        io.broadcast.emit('ball', ballObj)
        //mongo.setBall(ballObj);
        console.log('new number');
        numbersDrawn.push(newNumber);
    }
    else if (numbersDrawn.length === 0 && gameStarted === false) {
        // Start the game
        gameStarted = true;
        let newNumber = Math.floor((Math.random() * 100) + 1);
        let ballObj = { ball: newNumber, time: Date.now() };
        io.broadcast.emit('ball', ballObj)
        //mongo.setBall(ballObj);
        console.log('game started');
    }
}