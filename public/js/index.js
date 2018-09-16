var socket = io();

socket.on('connect', function () {
	console.log('connected to server');
});

socket.on('disconnect', function () {
	console.log('disconnected from server');
});

socket.on('newMessage', function (msg) {
	console.log('New Message', msg);
	const li = jQuery('<li></li>');
	li.text(`${msg.from}: ${msg.text}`);

	jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (msg) {
	const li = jQuery('<li></li>');
	const a = jQuery('<a target=_blank> My Current Location </a>');

	li.text(`${msg.from}: `);
	a.attr('href', msg.url);

	li.append(a);
	jQuery('#messages').append(li);

	jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', (e) => {
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message]').val()
	}, function () {
		console.log('Got it');
	});
});

const locationButton = jQuery('#send-location');
locationButton.on('click', (e) => {
	if (!navigator.geolocation) {
		return alert('Geolocation not supported by your browser.');
	}

	navigator.geolocation.getCurrentPosition((position) => {
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, () => {
		alert('Unable to fetch location.');
	}) 
})
