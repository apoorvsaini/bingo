/*
 * Handles all the MongoDB tasks
 * NOTE: Currently not in use
 */

const mongoConfig = require('../config/mongodb');
const mongodb = require('mongodb').MongoClient;

module.exports = {
    
    // Save drawn number in mongodb
    setBall: function(ballObj) {
        mongodb.connect(mongoConfig.MONGO_URI, { useNewUrlParser: true }, function(err, db) {
            if (err) throw err;

            let dbo = db.db(mongoConfig.MONGODB_DB);
            dbo.collection(mongoConfig.COLLECTION_BALLS).insertOne(ballObj, function(err, result) {
                if (err) throw err;
            });
        });
    },

    // In case someone wins, clear the balls and start a new game
    clearBalls: function() {
        
    },

    // Find the latest ball from in-memory and send back to user
    getBall: function(lastStamp) {
        
    },

    // Save generated tickets in mongoDB
    setTickets: function() {

    }
}