'use strict'

let osc = require('osc');
let WebSocketServer = require('ws').Server;
let oscMessageMap = require('./oscMessageMap');
let wss = new WebSocketServer({ port: 8080 });
let controllerConnections = [];
let soundAppConnections = [];

let oscServer = buildOscServer(8081, (message) => {
  let midiMessage = {
    data: JSON.stringify(mapOscToMidi(message))
  };
  publishClientMessage(midiMessage);
});


function publishClientMessage (event) {
  soundAppConnections.forEach(soundAppConnection => {
    try {
      soundAppConnection.send(event.data);
    }
    catch (error) {
      console.log('WSS.onClientMessage error:', error);
    }
  });
}

function publishSoundAppMessage (event) {
  try {
    controllerConnections.forEach(controllerConnection => {
      controllerConnection.send(event.data);
    });
  }
  catch (error) {
    console.log('WSS.onSoundAppMessage error:', error);
  }
}

wss.on('connection', (ws) => {

  ws.on('message', (msg) => {

    try {
      let message = JSON.parse(msg);
      if (message.type === 'CONNECTION') {
        if (message.client === 'CONTROLLER') {
          controllerConnections.push(ws);
          ws.addEventListener('message', publishClientMessage);
        }
        else if (message.client === 'SOUND_APP') {
          soundAppConnections.push(ws);
          ws.addEventListener('message', publishSoundAppMessage);
        }
      }

    }
    catch (error) {
      console.log('WSS.onMessage error:', error);
    }
  });

  ws.on('close', function close() {
    console.log('disconnected');
    controllerConnections = controllerConnections.filter(connection => ws !== connection);
    soundAppConnections = soundAppConnections.filter(connection => ws !== connection);
  });

  ws.send(JSON.stringify({
    status: 0,
    note: 8,
    value: 16
  }));

});



function buildOscServer (port, onMessageCallback) {

  const oscServer = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: port
  });

  oscServer.on("ready", () => console.log("UDP port open"));

  oscServer.on('message', (oscMessage) => {
    console.log('onMessage', oscMessage);
    onMessageCallback(oscMessage);
  });

  oscServer.on('error', (err) => console.log(err));

  oscServer.open();

  return oscServer;
}

const oscMap = {
  '/reverb': {
    type: 'MESSAGE',
    status: 0,
    note: 0
  },
  '/delay': {
    type: 'MESSAGE',
    status: 0,
    note: 1
  }
};


function getMidiValue (normalValue) {
  return Math.floor(normalValue * 127);
}

//TODO: enforce specific format for osc address: command/status/note
function mapOscToMidi (oscMessage) {
  //let midiNote = oscMap[oscMessage.address];
  let midiNote = oscMessageMap[oscMessage.address];
  midiNote.value = (midiNote) ? getMidiValue(oscMessage.args[0]) : 0;
  console.log('midi note', midiNote);
  return midiNote;
}
