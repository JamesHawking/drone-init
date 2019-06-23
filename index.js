const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var ioAlertFromAzure = io.of('/alertFromAzure');

app.get('/', function(req, res) {
  res.send('Hello Azure');
});

io.on('connection', function(socket) {
  socket.on('alert', function(data) {
    console.log('A client sent us this dumb message:', data.message);
    socket.emit('alertFromAzure', {});
  });
});

http.listen(process.env.PORT, function() {
  console.log('listening on *: ', process.env.PORT);
});
