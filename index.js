const { Socket } = require("dgram");

const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
var nextroundCount = 0;
//when there is a get request on root directory, call index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//connection, disconnect anlamlı kelimeler mi?
io.on("connection", (socket) => {
  // socket.on("disconnect", () => {
  //   console.log("user disconnected");
  //   io.emit("disconnect-user", socket.id);
  // });

  socket.on("next-round", ()=>{
    nextroundCount ++;
    io.emit("next-round", nextroundCount);
    //socket.emit
  })
  socket.on("smiled", ()=>{
    socket.broadcast.emit("smiled", socket.id)
  })
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});

// homework
// Broadcast a message to connected users when someone connects or disconnects.
// Add support for nicknames.
// Don’t send the same message to the user that sent it. Instead, append the message directly as soon as he/she presses enter.
// Add “{user} is typing” functionality.
// Show who’s online.
// Add private messaging.
