const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage } = require('./utils/message');
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

  // socket.emit() emit an event to this single connection
  socket.emit('newMessage', generateMessage('Admin', 'Hey. Welocom to the chat app'));

  // socket.broadcast.emit() is going to emmit an event to every single
  // connection BUT this socket
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  // Custom event
  socket.on('createMessage', message => {
    console.log('createMessage', message);

    // io.emit() emit an event to every single connection
    io.emit('newMessage', generateMessage(message.from, message.text));

    // socket.broadcast.emit('newMessage', {
    //     from: message.from,
    //     text: message.text,
    //     createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
server.listen(port, () => console.log('App running on port', port));
