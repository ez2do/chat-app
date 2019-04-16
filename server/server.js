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
    console.log('Connected to the server');
    
    //send welcome message to that user
    socket.emit('new message', {
        text: 'Welcome to the chat app',
        from: 'Admin'
    });

    //inform other user of the new user join
    socket.broadcast.emit('new message', {
        text: 'A new user has joined the chat app',
        from: 'Admin'
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    // socket.emit('new message', {
    //     from: 'Tuan Anh',
    //     content: 'fuck you'
    // });

    //send a message to all other user
    // socket.on('create message', (message) => {
    //     console.log('New message created', message);
    //     // io.emit('new message', message);
    //     socket.broadcast.emit('new message', {
    //         text: message.text,
    //         from: message.from,
    //         createAt: new Date()
    //     });
    // });
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});