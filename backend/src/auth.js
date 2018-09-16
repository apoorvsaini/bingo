let uniqid = require('uniqid');

module.exports = function() {
    let randomNumber = Math.floor((Math.random() * 1000) + 1);
    return uniqid(randomNumber + '-');
}