const express = require("express");
const app = new express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('dist'));

var messages = [];

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
});

app.get("/messages", (req, res) => {
    res.send(messages);
});

io.on('connection', (socket) => {
    console.log('A user has connected');
    socket.on('message', (message) => {
        console.log('Received message:', message);
        messages.push(message);
        io.emit('message', message);
        checkIfMessageIsCommand(message);
    });
    socket.on('disconnect', () => {
        console.log('A user has disconnected');
    });
    socket.on('resetMessage', () => {
        messages = [];
        io.emit('resetMessage');
    });
});

http.listen(3000, () => {
    console.log('Server läuft auf Port 3000');
});

function checkIfMessageIsCommand(message) {
    if (message.text.startsWith('/')) {
        if(message.text == "/clear"){
            messages = [];
            io.emit('resetMessage');
        }
    }
}