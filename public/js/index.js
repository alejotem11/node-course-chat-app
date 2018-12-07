// Initiating the request from the client to se verver to open up a web
// socket and keep that connection open
const socket = io();

// It is recommended to use conventional functions instead of arrow
// functions because with some clients (i.e. android or ios) this could
// cause the app to crash
socket.on('connect', function () {
  console.log('Connected to server');

  // socket.emit('createMessage', {
  //   from: 'Alejo',
  //   text: 'Hey. This is Alejandro.'
  // });
});
socket.on('disconnect', function () {
  console.log('Disconnected from server');
});
// Custom event
socket.on('newMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = jQuery('#message-template').html(); // Taking the html content
  const html = Mustache.render(template, { // Replacing the variables with the corresponding values
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  // const formattedTime = moment(message.createdAt).format('h:mm a');
  // const li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = jQuery('#location-message-template').html();
  const html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  const messageTextbox = jQuery('[name=message]');
  // The callback function is for the acknowledgment event
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val() // Get the value of the element with the name att = message
  }, function () {
    messageTextbox.val(''); // Setting the value to empty
  });
});

const locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
  locationButton.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location');
  });
});
