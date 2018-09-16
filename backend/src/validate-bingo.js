/*
 * Validate the ticket submitted by client
*/
const userData = require('../store/tickets');
const balls = require('../store/balls');

module.exports = function(userId, boardId) {
    let data = userData[userId][boardId];
    data['balls'] = balls;
    return (data);
}