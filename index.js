const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.send('Hello');
});

io.on('alert', function(socket) {
  console.log('alert');
  io.emit('alertFromAzure');
});

http.listen(process.env.PORT, function() {
  console.log('listening on *: ', process.env.PORT);
});
