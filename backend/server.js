import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import meetingRoutes from "./routes/meetingRoutes.js";

dotenv.config();
const app = express();

// Connect MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/meetings", meetingRoutes);

app.get("/", (req, res) => {
  res.send("🚀 ConnectUs Backend Running Successfully");
});

// HTTP + WebSocket Server
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

// 🔁 Socket.io for Real-Time Communication (WebRTC Signaling)
io.on("connection", (socket) => {
  console.log(`🟢 New socket connected: ${socket.id}`);

  socket.on("join-room", (roomId, userId) => {
    console.log(`👤 User ${userId} joined room ${roomId}`);
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", userId);

    socket.on("disconnect", () => {
      console.log(`🔴 User ${userId} disconnected`);
      socket.to(roomId).emit("user-disconnected", userId);
    });
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
