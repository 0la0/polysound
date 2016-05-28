'use strict'

let WebSocketServer = require('ws').Server;
let wss = new WebSocketServer({ port: 8080 });

let testMessage = {
  status: 0,
  note: 8,
  value: 16
};

wss.on('connection', (ws) => {
  ws.on('message', (msg) => {
    try {
      let message = JSON.parse(msg);
      console.log('message:', message.type);
    }
    catch (error) {
      console.log('WSS.onMessage error:', error);
    }
  });

  ws.send(JSON.stringify(testMessage));
});
