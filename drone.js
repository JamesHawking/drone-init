const dgram = require('dgram');
const wait = require('waait');
// const app = require('express')();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
const throttle = require('lodash/throttle');
// const commandDelays = require('./commandDelays');

const PORT = 8889;
const HOST = '192.168.10.1';
const drone = dgram.createSocket('udp4');
drone.bind(PORT);

const commands = ['command', 'battery?', 'takeoff', 'land'];

function handleError(err) {
  if (err) {
    console.log('ERROR');
    console.log(err);
  }
}

drone.send('command', 0, 'command'.length, PORT, HOST, handleError);
drone.send('battery?', 0, 'battery?'.length, PORT, HOST, handleError);

// drone.send('takeoff', 0, 'takeoff'.length, PORT, HOST, handleError);
// drone.send('land', 0, 'land'.length, PORT, HOST, handleError);

drone.on('message', (msg, info) => {
  console.log('Data received from server : ' + msg.toString());
  console.log(
    'Received %d bytes from %s:%d\n',
    msg.length,
    info.address,
    info.port
  );
});
