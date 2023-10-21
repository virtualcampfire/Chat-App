const express = require("express");
const app = new express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('dist'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
});

io.on('connection', (socket) => {
    console.log('A user has connected');
    socket.on('message', (message) => {
        console.log('Received message:', message);
        io.emit('message', message);
    });
    socket.on('disconnect', () => {
        console.log('A user has disconnected');
    });
});

http.listen(3000, () => {
    console.log('Server läuft auf Port 3000');
});