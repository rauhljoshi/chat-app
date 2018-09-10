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
		from: 'Admin',
		text: 'Welcome to the chat room',
		createdAt: new Date().getTime()
	});

	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'New User joined',
		createdAt: new Date().getTime()
	});

	socket.on('createMessage', (msg) => {
		console.log('createMessage', msg);
		io.emit('newMessage', {
			from: msg.from,
			text: msg.text,
			createdAt: new Date().getTime()
		});

		// socket.broadcast.emit('newMessage', {
		//  	from: msg.from,
		//  	text: msg.text,
		// 	createdAt: new Date().getTime()
		// });
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