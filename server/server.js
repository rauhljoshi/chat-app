const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat room'));

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined'));

	socket.on('createMessage', (msg, callback) => {
		console.log('createMessage', msg);
		io.emit('newMessage', generateMessage(msg.from, msg.text));
		callback();

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