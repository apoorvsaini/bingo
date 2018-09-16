let express = require('express');
let bodyParser = require('body-parser');
let routes = require('./routes/routes');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

routes(app);

let server = app.listen(connection.PORT, function () {
    console.log('app running on port.', server.address().port);
});