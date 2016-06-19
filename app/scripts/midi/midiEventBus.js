class MidiEventBus {

  constructor () {
    this.activeListener;
    this.listenerMap = new Map();
  }

  registerActiveListener (listener) {
    this.activeListener = listener;
  }

  deregisterActiveListener (listener) {
    if (this.activeListener && this.activeListener === listener) {
      this.activeListener = null;
    }
  }

  onMidiMessage (event) {
    let message = getObjectFromMessage(event.data);
    this.onMessage(message.command, message.status, message.note, message.value);
  }

  onWebSocketMessage (command, status, note, value) {
    this.onMessage(command, status, note, value);
  }

  onMessage (command, status, note, value) {
    let mapKey = `${status}_${note}`;
    if (this.activeListener) {
      this.listenerMap.set(mapKey, this.activeListener);
      this.activeListener.isRegistered = true;
      this.activeListener.setBoundMidiData(command, status, note, value);
    }
    else {
      if (this.listenerMap.get(mapKey)) {
        console.log('send to listener: ', command, status, note, value);
        this.listenerMap.get(mapKey)
          .onMessage(command, status, note, value);
      }
    }
  }

}

//TODO: refactor to global midi helper
function getObjectFromMessage (midiMessage) {
  let command = (midiMessage[0] & '0xF0') >>> 4;
  let status = midiMessage[0] & '0xF';

  return {
    command: command,
    status: status,
    note: midiMessage[1],
    value: midiMessage[2]
  };
}

function buildMidiEventBus () {
  return new MidiEventBus();
}

export default buildMidiEventBus;
