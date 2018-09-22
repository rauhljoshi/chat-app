var socket = io();

socket.on('connect', function () {
	console.log('connected to server');
});

socket.on('disconnect', function () {
	console.log('disconnected from server');
});

socket.on('newMessage', function (msg) {
	console.log('New Message', msg);
	const formattedTime = moment(msg.createdAt).format('h:mm a');
	const li = jQuery('<li></li>');
	li.text(`${msg.from} ${formattedTime}: ${msg.text}`);

	jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (msg) {
	const li = jQuery('<li></li>');
	const a = jQuery('<a target=_blank> My Current Location </a>');
	const formattedTime = moment(msg.createdAt).format('h:mm a');

	li.text(`${msg.from} ${formattedTime}: `);
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
		jQuery('[name=message]').val('');
	});
});

const locationButton = jQuery('#send-location');
locationButton.on('click', (e) => {
	if (!navigator.geolocation) {
		return alert('Geolocation not supported by your browser.');
	}
	locationButton.attr('disabled', 'disabled');
	locationButton.text('Sending...');
	navigator.geolocation.getCurrentPosition((position) => {
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
		locationButton.removeAttr('disabled');
		locationButton.text('Send Location');
	}, () => {
		alert('Unable to fetch location.');
		locationButton.removeAttr('disabled');
		locationButton.text('Send Location');
	}) 
})
