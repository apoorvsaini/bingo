/*
 * This service will keep generating a new number/ball (till 100),
 * marking as start and finish of the game
 * 
 * The numbers will be stored in mongodb for validating the Bingo! claims
*/

const serviceConstants = require('../config/game-service');
const mongo = require('./mongo');
const shuffle = require('../utils/shuffle');
const balls = require('../store/balls');

let counter = 0;
let allBalls = [];

for (let i = 1; i <= 100; i++)
    allBalls.push(i);

shuffle(allBalls);

module.exports = function(io) {
    if (counter === 99) {
        shuffle(allBalls);
        counter = 0;
        console.log('ran out of numbers');
    }
    else {
        let newNumber = allBalls[counter];
        let ballObj = { ball: newNumber, time: Date.now() };
        io.broadcast.emit('ball', ballObj)
        //mongo.setBall(ballObj);
        balls.push(newNumber);
        counter += 1;
    }
}