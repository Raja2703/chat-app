const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});

io.on('connection', (socket) => {
	console.log('New client added to the socket ', socket.id);

	socket.on('join_room', (roomId) => {
		socket.join(roomId);
		console.log(`User ${socket.id} joined room no ${roomId}`);
	});

	socket.on('send_msg', (data) => {
		socket.to(data.roomId).emit('receive_msg', data);
	});

	socket.on('disconnect', () => {
		console.log('Client disconnected ', socket.id);
	});
});

server.listen(3001, () => {
	console.log('server running on port 3001');
});
