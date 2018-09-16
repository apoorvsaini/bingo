let express = require('express');
let bodyParser = require('body-parser');
let routes = require('./routes/routes');
let connection = require('./config/server');
let serviceConstants = require('./config/game-service');
let gameService = require('./src/game-service');

let app = express();
let connectedUsers = new Set();

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

/*
 * SocketIO implementation
*/
io.on('connection', function (socket) {
    socket.on('connected', function (data) {
        console.log('new player connected');
        console.log(data);
        let userId = data.user_id;
        connectedUsers.add(userId);
        console.log(connectedUsers.size)

        // Start when first player is connected
        if (connectedUsers.size === 1) {
            let timerId = setInterval((io) => gameService(socket), serviceConstants.TIME_INTERVAL);
        }
    });
});


server.listen(connection.PORT, function () {
    console.log('app running on port.', server.address().port);
});