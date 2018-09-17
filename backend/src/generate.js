/*
 * Generate 100 numbers for user's tickets
 * Shuffle and divide the numbers into 4 tickets
 */

const gameConfig = require('../config/game-service');
const userData = require('../store/tickets');
const shuffle = require('../utils/shuffle');
let userBalls = require('../store/user-balls');

module.exports = function(id) {
    if (userData.hasOwnProperty(id)) {
        return userData[id];
    }

    let ticketsData = {};
    let allNumbers = [];

    for (let i = 1; i <= 100; i++ )
        allNumbers.push(i);

    for (let k = 0; k < gameConfig.MAX_TICKETS; k++) {
        shuffle(allNumbers);
        ticketsData[k] = allNumbers.slice(0, 25);
    }

    userData[id] = ticketsData;
    return ticketsData;
}