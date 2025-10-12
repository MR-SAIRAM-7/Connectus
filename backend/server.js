const express = require('express');
const http = require('http');
const cors = require('cors');
const socketio = require('socket.io');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/meetings', require('./routes/meetingRoutes'));

const server = http.createServer(app);
const io = socketio(server, {
  cors: { origin: '*' },
});

// Socket.io signaling
io.on('connection', (socket) => {
  console.log('New connection:', socket.id);

  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', userId);

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId);
    });
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
