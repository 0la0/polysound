
function buildWebSocketClient (ipAddress, port, midiEventBus) {
  let serverUrl = `ws://${ipAddress}:${port}`;
  let socket = new WebSocket(serverUrl);

  socket.onopen = (event) => {
    let message = {
      type: 'CONNECTION',
      client: 'SOUND_APP'
    };
    socket.send(JSON.stringify(message));
  };

  socket.onmessage = (event) => {
    try {
      let message = JSON.parse(event.data);
      console.log('message:', message);
      midiEventBus.onWebSocketMessage(null, message.status, message.note, message.value);
    }
    catch (error) {
      console.log('socket.onmessage error:', error);
    }
  };

  socket.onerror = (event) => {
    console.log('WebSocket error:', event);
  };


}


export default buildWebSocketClient;
