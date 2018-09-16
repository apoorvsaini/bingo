let mongoConfig = require('../config/mongodb');
let mongodb = require('mongodb').MongoClient;

module.exports = {
    // Save drawn number in mongodb
    setBall: function(ball) {
        mongodb.connect(mongoConfig.MONGO_URI, { useNewUrlParser: true }, function(err, db) {
            if (err) throw err;

            let dbo = db.db(mongoConfig.MONGODB_DB);
            let query = { timestamp: Date.now(), ball: ball };
            dbo.collection(mongoConfig.COLLECTION_BALLS).insertOne(query, function(err, result) {
                if (err) throw err;
            });
        });
    },

    // In case someone wins, clear the balls and start a new game
    clearBalls: function() {
        
    },

    // Find the latest ball and send back to user
    getBall: function() {

    },

    // Save generated tickets in mongoDB
    setTickets: function() {}
}