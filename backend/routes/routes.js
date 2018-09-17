const response = require('../constants/response');
const auth = require('../src/auth');
const generate = require('../src/generate');
const mongo = require('../src/mongo');
const validate = require('../src/validate-bingo');
const userData = require('../store/tickets');
const balls = require('../store/balls');
const markedBalls = require('../store/user-balls');

let appRouter = function (app) {
    
    // Default endpoint
    app.get("/", function(req, res) {
        res.status(response.OK_STATUS).send("Bingo Time!");
    });

    /* 
     * Endpoint for generating userId
     */
    app.get("/auth/", function (req, res) {
        let data = ({ user_id: auth() });
        res.status(response.OK_STATUS).send(data);
    });


    /* 
     * Endpoint for generating bingo numbers for 4 tickets
     * GET user's id: userId
     * Store tickets in MongoDB to validate later
     */
    app.get("/generate/:id", function (req, res) {
        let id = req.params.id;
        let data = generate(id);
        res.status(response.OK_STATUS).send(data);
    });

    /* 
     * Endpoint for validating bingo claim
     * GET userId and json: board numbers
     * Verify with board data stored in MongoDB
     * If won, mongodb collection needs to be cleared
     */
    app.get("/bingo/:id/:board", function (req, res) {
        let userId = req.params.id;
        let boardId = req.params.board;
        res.status(response.OK_STATUS).send(validate(userId, boardId));
    });

    /* 
     * Endpoint to get the latest ball/number and also provide the state of the game
     * Ball numbers to be Global, irrespective of the palyers and game instances
     */
    app.get("/draw/:id", function (req, res) {
        /*
         *let lastBallTime = req.params.lastBallTime;
         *let data = mongo.getBall(parseInt(lastBallTime));
         */
        let userId = req.params.id;
        let lastBall = balls[balls.length - 1];
        if (balls.length === 0) lastBall = 0

        markedBalls[userId] = new Set();

        res.status(response.OK_STATUS).send({ last_ball: lastBall });
    });

    /*
     * For in-memory data integrity test
     */
    app.get("/test/:id", function (req, res) {
        let userId = req.params.id;
        res.status(response.OK_STATUS).send({ tickets: userData[userId], marked: Array.from(markedBalls[userId]) });
    });
}

module.exports = appRouter;