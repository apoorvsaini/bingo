let response = require('../constants/response');
let auth = require('../src/auth');
let generate = require('../src/generate');

let appRouter = function (app) {
    
    // Default endpoint
    app.get("/", function(req, res) {
        res.status(response.OK_STATUS).send("Bingo Time!");
    });

    /* 
     * Endpoint for generating userId
    */
    app.get("/auth/", function (req, res) {
        let data = ({
            user_id: auth()
        });
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
     * POST json: board numbers
     * Verify with board data stored in MongoDB
    */
    app.get("/bingo/:id", function (req, res) {
        let id = req.params.id;
        let data = ({
            user_id: id
        });
        res.status(response.OK_STATUS).send(data);
    });

    /* 
     * Endpoint to get the latest ball/number and also provide the state of the game
     * Ball numbers to be Global, irrespective of the palyers and game instances
    */
    app.get("/draw", function (req, res) {
        let id = req.params.id;
        let data = ({
            user_id: id
        });
        res.status(response.OK_STATUS).send(data);
    });
}

module.exports = appRouter;