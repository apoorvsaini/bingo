/*
 * Validate the ticket submitted by client
*/
const userData = require('../store/tickets');
const balls = require('../store/balls');

module.exports = function(userId, boardId) {
    let resultJson = { claim: false };
    let data = userData[userId][boardId];
    let result = data.every(function(val) { return balls.indexOf(val) >= 0; });
    resultJson['claim'] = result;
    
    return (resultJson);
}