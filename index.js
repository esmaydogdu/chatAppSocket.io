const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

//when there is a get request on root directory, call index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
 
//connection, disconnect anlamlı kelimeler mi?
io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    socket.on('chat message', (msg)=>{
        //use io.emit if you want to send msg to everyone
        io.emit('chat message', msg);

        //use broadcast.emit if you want to send everyone except the emitter
        //socket.broadcast.emit('chat message', msg);
    })
  });

http.listen(3000, () => {
  console.log('listening on *:3000');
});


// homework
// Broadcast a message to connected users when someone connects or disconnects.
// Add support for nicknames.
// Don’t send the same message to the user that sent it. Instead, append the message directly as soon as he/she presses enter.
// Add “{user} is typing” functionality.
// Show who’s online.
// Add private messaging.