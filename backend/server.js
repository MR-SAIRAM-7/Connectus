import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import meetingRoutes from "./routes/meetingRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/meetings", meetingRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);

    const users = [...io.sockets.adapter.rooms.get(roomId) || []].filter(id => id !== socket.id);
    socket.emit("all-users", users);

    socket.to(roomId).emit("user-joined", { signal: null, callerId: socket.id });

    socket.on("sending-signal", payload => {
      io.to(payload.userToSignal).emit("user-joined", { signal: payload.signal, callerId: payload.callerId });
    });

    socket.on("returning-signal", payload => {
      io.to(payload.callerId).emit("receiving-returned-signal", { signal: payload.signal, id: socket.id });
    });

    socket.on("disconnect", () => {
      socket.to(roomId).emit("user-disconnected", socket.id);
    });
  });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
