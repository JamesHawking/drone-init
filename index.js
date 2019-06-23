const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.send('Hello');
});

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('alert', () => {
    socket.emit('alertFromAzure');
  });
});

http.listen(process.env.PORT, function() {
  console.log('listening on *: ', process.env.PORT);
});
