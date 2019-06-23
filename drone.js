const dgram = require('dgram');
const tellosocket = require('socket.io-client')(
  'https://tellosocket.azurewebsites.net/'
);
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

tellosocket.on('connect', function() {
  console.log('socket connected');
});

tellosocket.on('alert', function(data) {
  console.log('alert');
  console.log(data);
});

tellosocket.on('event', function(data) {
  console.log('test');
  console.log(data);
});

tellosocket.on('alertFromAzure', function(data) {
  console.log('alertFromAzure');
  console.log(data);
});

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
