/*
 * Validate the ticket submitted by client
*/
const userData = require('../store/tickets');
const balls = require('../store/balls');
let winnerList = require('../store/winners');

module.exports = function(userId, boardId) {
    console.log('validating... ' + userId + ' ' + boardId);
    let resultJson = { claim: false };
    // Take last 200 balls
    let lastBalls = balls.slice(-200);

    let data = userData[userId][boardId];
    let result = data.every(function(val) { return lastBalls.indexOf(val) >= 0; });
    resultJson['claim'] = result;
    resultJson['won'] = false;

    // Get rankings
    if (winnerList.length === 0) {
        winnerList.push(userId);
        resultJson['won'] = true;
    }
    else {
        resultJson['won'] = false;
    }
        
    return (resultJson);
}