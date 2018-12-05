const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
// Integrating socket.io to our server (the code line below), we've got access
// to a route that accepts incoming connections, and we have access to a
// javascript library to be able to work with socket io on the client, available
// at the path /socket.io/socket.io.js
const io = socketIO(server);

// Add middleware to tweak express to work as we want to serve a static directory
app.use(express.static(publicPath));

// Register an event listener
io.on('connection', (socket) => { // Lister for a new connection
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'Mike',
    text: 'Hey! What is going on',
    createdAt: 177389
  });

  // Custom event
  socket.on('createMessage', message => {
    console.log('createMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
server.listen(port, () => console.log('App running on port', port));
