var socket = io();

socket.on('connect', function () {
	console.log('connected to server');
});

socket.on('disconnect', function () {
	console.log('disconnected from server');
});

socket.on('newMessage', function (msg) {
	const template = jQuery('#message-template').html();
	const formattedTime = moment(msg.createdAt).format('h:mm a');
	const html = Mustache.render(template, {
		text: msg.text,
		from: msg.from,
		createdAt: formattedTime
	});
	jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (msg) {
	const formattedTime = moment(msg.createdAt).format('h:mm a');
	const template = jQuery('#location-message-template').html();
	const html = Mustache.render(template, {
		url: msg.url,
		from: msg.from,
		createdAt: formattedTime
	});
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
