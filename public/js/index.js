var socket = io();
socket.on('connect', function(){
    console.log('Connected to server');
});
socket.on('disconnect', function(){
    console.log('Disconnect from server');
});
socket.on('new message', function(message){
    console.log('Message come in', message);
});
socket.emit('create message', {
    from: 'Ronaldo',
    content: 'fuck cc'
});