var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


app.use(express.static(__dirname + '/bower_components'));
app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', (client) => {
    console.log('Client Connected');

    client.on('join', (data) => {
        console.log(`Message received from client : ${data}`);
    });


    client.on('messages', (data) => {
        client.emit('broad', data);
        client.broadcast.emit('broad', data);
    });
});

server.listen(process.env.PORT);