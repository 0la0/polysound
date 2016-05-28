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

  onMessage (event) {
    let message = getObjectFromMessage(event.data);
    let mapKey = `${message.status}_${message.note}`;
    if (this.activeListener) {
      this.listenerMap.set(mapKey, this.activeListener);
    }
    else {
      if (this.listenerMap.get(mapKey)) {
        this.listenerMap.get(mapKey)
          .onMessage(message.command, message.status, message.note, message.value);
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
