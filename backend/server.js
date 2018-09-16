const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const connection = require('./config/server');
const serviceConstants = require('./config/game-service');
const gameService = require('./src/game-service');

let app = express();
let userConnected = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

routes(app);

let server = require('http').Server(app);
let io = require('socket.io')(server);
let timerId;

/*
 * SocketIO implementation
*/
io.on('connection', function (socket) {
    userConnected += 1;
    if (userConnected === 1) {
        timerId = setInterval(() => gameService(socket), serviceConstants.TIME_INTERVAL);
    }

    socket.on('disconnect', function () {
        userConnected -= 1;
        if (userConnected === 0) {
            clearInterval(timerId);
        }
    });
});

/*
* Start game service
* To scale, it should become a separate service
*/   




server.listen(connection.PORT, function () {
    console.log('app running on port.', server.address().port);
});