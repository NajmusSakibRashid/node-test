const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("drawing", (data) => {
    console.log("a line is drawn");
    socket.broadcast.emit("drawing", data);
  });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
