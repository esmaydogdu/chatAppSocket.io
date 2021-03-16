const { Socket } = require("dgram");

const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
var nextroundCount = 0;
//when there is a get request on root directory, call index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
const db = {};
const rooms = {};
//connection, disconnect anlamlı kelimeler mi?
io.on("connection", (socket) => {
  // socket.on("disconnect", () => {
  //   console.log("user disconnected");
  //   io.emit("disconnect-user", socket.id);
  // });

  socket.on("join room", (payload) => {
    if (!rooms[payload.room]) {
      rooms[payload.room] = { host: socket.id, counter: 0 };
      console.log("rooms", rooms);
    }
    socket.join(payload.room);
    db[socket.id] = payload;
    console.log(db);
  });

  socket.on("next-round", () => {
    const currentUserData = db[socket.id];
    const currentRoom = rooms[currentUserData.room];

    if (currentRoom.host === socket.id) {
      currentRoom.counter++;
      io.to(currentUserData.room).emit("next-round", currentRoom.counter);
    }
  });

  socket.on("smiled", () => {
    const currentUserData = db[socket.id];
    socket.to(currentUserData.room).emit("smiled", currentUserData.user);
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});

//join or create room input
//read that instead of prompt
