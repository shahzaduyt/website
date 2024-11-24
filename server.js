// Import necessary modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (CSS, JS, HTML) from the public folder
app.use(express.static('public'));

// Route for the home page (index.html)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Route for the room page (room.html)
app.get('/room', (req, res) => {
    res.sendFile(__dirname + '/public/room.html');
});

// Store the users and their rooms
let rooms = {};

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // When a user joins a room
    socket.on('joinRoom', ({ roomId, username }) => {
        console.log(`${username} joined room: ${roomId}`);
        socket.join(roomId); // Join the specific room
        rooms[roomId] = rooms[roomId] || [];
        rooms[roomId].push(username);

        // Emit to everyone in the room that a new user has joined
        io.to(roomId).emit('message', `${username} has joined the room!`);
    });

    // When a message is sent by a user
    socket.on('sendMessage', ({ roomId, username, message }) => {
        console.log(`Message from ${username}: ${message}`);
        
        // Broadcast the message to all users in the room
        io.to(roomId).emit('message', `${username}: ${message}`);
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
