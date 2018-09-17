/*
 * Validate the ticket submitted by client
*/
const userData = require('../store/tickets');
const balls = require('../store/balls');

module.exports = function(userId, boardId) {
    let resultJson = { claim: false };
    // Take last 200 balls
    let lastBalls = balls.slice(-200);

    console.log(boardId);
    let data = userData[userId][boardId];
    console.log(data);
    console.log(lastBalls);
    let result = data.every(function(val) { return lastBalls.indexOf(val) >= 0; });
    resultJson['claim'] = result;

    return (resultJson);
}