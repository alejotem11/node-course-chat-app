const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
// Integrating socket.io to our server (the code line below), we've got access
// to a route that accepts incoming connections, and we have access to a
// javascript library to be able to work with socket io on the client, available
// at the path /socket.io/socket.io.js
const io = socketIO(server);
const users = new Users();

// Add middleware to tweak express to work as we want to serve a static directory
app.use(express.static(publicPath));

// Register an event listener
io.on('connection', (socket) => { // Listen for a new connection
  console.log('New user connected');

  // Types of emit:
  // io.emit() emit an event to every single connection
  // socket.emit() emit an event to this single connection
  // socket.broadcast.emit() is going to emmit an event to every single connection except for this socket
  // io.to([ROOM_NAME]).emit() emit to every users connected to the specified Room
  // socket.broadcast.to([ROOM_NAME]).emit() the same functionality that the above

  // Custom event
  // If you want to use event acknowledgments to let your emitters know some state
  // on your server you must use callbacks
  socket.on('join', (params, callback) => {
    const room = params.room;
    const name = params.name;
    if (!isRealString(name) || !isRealString(room)) {
      return callback('Name and room name are required');
    }
    // Allow people to talk only with people connected to the same room
    socket.join(room);
    // socket.leave(params.room); // To kick you out of the specified room

    users.removeUser(socket.id); // To remove from previous sessions in other rooms
    users.addUser(socket.id, params.name, params.room);

    io.to(room).emit('updateUsersList', users.getUserList(room));
    socket.emit('newMessage',
      generateMessage('Admin', 'Hey. Welcome to the chat app'));
    socket.broadcast.to(room)
      .emit('newMessage', generateMessage('Admin', `${name} has joined`));

    callback(); // To indicate in the acknowledgment function that there was no errors
  });

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords));
  });

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);
    const room = user.room;
    if (user) {
      io.to(room).emit('updateUsersList', users.getUserList(room));
      socket.broadcast.to(room)
        .emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });
});
server.listen(port, () => console.log('App running on port', port));
