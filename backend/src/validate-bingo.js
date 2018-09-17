/*
 * Validate the ticket submitted by client
 */

const userData = require('../store/tickets');
const balls = require('../store/balls');
let winnerList = require('../store/winners');
let userBalls = require('../store/user-balls');

module.exports = function(userId, boardId) {
    console.log('validating... ' + userId + ' ' + boardId);
    let resultJson = { claim: false };
    // Take last 200 balls
    let lastBalls = balls.slice(-200);

    let data = userData[userId][boardId];
    let result = data.every(function(val) { return userBalls[userId].has(val); });
    resultJson['claim'] = result;
    resultJson['won'] = false;

    if (result) {
        // Clear out previous data
        userBalls[userId] = new Set();
        userData[userId] = [];
    }

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