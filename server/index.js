const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join-room", (data) => {
    socket.join(data.roomId);

    console.log(`${data.nickname} joined room ${data.roomId}`);
  });

  socket.on("play", (data) => {
    console.log(`Play received from ${data.nickname} in room ${data.roomId}`);

    socket.to(data.roomId).emit("play", {
      from: data.nickname,
    });
  });

  socket.on("pause", (data) =>{
    console.log(`Pause received from ${data.nickname} in room ${data.roomId}`);
    
    socket.to(data.roomId).emit("pause", {
      from: data.nickname,
    });
  })

  socket.on("change-video", (data) => {
  console.log(
    `Video changed by ${data.nickname} in room ${data.roomId}: ${data.videoId}`
  );

    socket.to(data.roomId).emit("change-video", {
      from: data.nickname,
      videoId: data.videoId,
  });
});

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});