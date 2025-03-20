import http from "http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const port = 3000;

const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = http.createServer((req, res) => handler(req, res));
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socket.on("join-room", (room) => {
      socket.join(room);
      console.log(`User ${socket.id} joined room ${room}`);
      io.to(room).emit("user-joined", `User ${socket.id} has joined the room.`);
    });

    socket.on("send-message", ({ room, message, user }) => {
      io.to(room).emit("receive-message", { user, message });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });

  httpServer.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
});
