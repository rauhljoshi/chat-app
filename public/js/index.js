var socket = io();

socket.on('connect', function () {
	console.log('connected to server');

	socket.emit('createMessage', {
		from: 'rahul@gmail.com',
		text: 'You are the shit, man.'
	});
});

socket.on('disconnect', function () {
	console.log('disconnected from server');
});


socket.on('newMessage', function (msg) {
	console.log('New Message', msg);
});