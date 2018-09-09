const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

	socket.emit('newMessage', {
		from: 'rahul@gmail.com',
		text: 'Hey, man. What is going on?',
		createdAt: 1231
	});

	socket.on('createMessage', (msg) => {
		console.log('createMessage', msg);
	});

	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});
});

// app.get('/', (req, res) => {
// 	res.render('index.html');
// });

server.listen(port, () => {
	console.log(`listening on port ${port}`);
});