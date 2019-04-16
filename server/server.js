const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
app.use(express.static(publicPath));       //use index.html as default
var io = socketIO(server);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/chat_interface.html'));
});

io.on('connection', (socket) => {
    console.log('new user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    // socket.emit('new message', {
    //     from: 'Tuan Anh',
    //     content: 'fuck you'
    // });
    socket.on('create message', (message) => {
        console.log('New message created', message);
        io.emit('new message', message);
    });
    // socket.on('chat message', (message) => {
    //     console.log(message);
    //     io.emit('chat message', message);
    // });
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});