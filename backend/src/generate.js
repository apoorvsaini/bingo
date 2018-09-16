/*
 * Generate 100 numbers for user's tickets
 * Shuffle and divide the numbers into 4 tickets
*/
let gameConfig = require('../config/game-service');
let userData = require('../store/tickets');


function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

module.exports = function(id) {
    // TODO: check if numbers already given to this user from MongoDB
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