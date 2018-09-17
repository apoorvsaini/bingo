/*
 * This service will keep generating a new number/ball (till 100),
 * marking as start and finish of the game
 * 
 * The numbers will be stored in mongodb for validating the Bingo! claims
*/

const serviceConstants = require('../config/game-service');
const mongo = require('./mongo');
const shuffle = require('../utils/shuffle');
let balls = require('../store/balls');

let counter = 0;
let allBalls = [];

/*
  Generate the numbers and keep shuffling them in each cycle
*/
for (let i = 1; i <= serviceConstants.MAX_BALLS; i++)
    allBalls.push(i);

shuffle(allBalls);

module.exports = function(io) {
    if (counter === serviceConstants.MAX_BALLS - 1) {
        shuffle(allBalls);
        counter = 0;
    }
    else {
        let newNumber = allBalls[counter];
        let ballObj = { ball: newNumber, time: Date.now() };
        io.broadcast.emit('ball', ballObj)
        //mongo.setBall(ballObj);
        balls.push(newNumber);
        counter += 1;

        // Mark numbers on the user's tickets in-memory
        
    }
}