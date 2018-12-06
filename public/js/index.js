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
  console.log('New message', message);
});
