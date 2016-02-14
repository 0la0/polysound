
const StatusMap = {
  NOTE_ON:  9,
  NOTE_OFF: 8
};

var midiDeviceFactory;

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

function getMessageFromObject (messageObject) {
  return new Uint8Array([
    (messageObject.command << 4) | messageObject.status,
    messageObject.note,
    messageObject.value
  ]);
}

class MidiDeviceFactory {

  constructor (midiAccess) {
    this.midiAccess = midiAccess;
  }

  getInputList () {
    let inputs = Array.from(this.midiAccess.inputs.values());
    return inputs;
  }

  getOutputList () {
    let outputs = Array.from(this.midiAccess.outputs.values());
    return outputs;
  }

  getInputByName (deviceName) {
    return Array.from(this.midiAccess.inputs.values())
      .find(inputDevice => inputDevice.name === deviceName);
  }

  getOutputByName (deviceName) {
    return Array.from(this.midiAccess.outputs.values())
      .find(outputDevice => outputDevice.name === deviceName);
  }

  getDeviceByName (deviceName) {
    return {
      input: this.getInputByName(deviceName),
      output: this.getOutputByName(deviceName)
    };
  }

}

function initMidi () {
  if (!navigator.requestMIDIAccess) {
    console.warn('WebMidiApi not supported in this browser');
    return;
  }

  navigator.requestMIDIAccess().then(
    (resolve) => {
      midiDeviceFactory = new MidiDeviceFactory(resolve);

      let apc = midiDeviceFactory.getDeviceByName('Akai APC20');
      apc.input.onmidimessage = (event) => {
        let message = getObjectFromMessage(event.data);
      };

      testLoop(apc.output, 0, 7);
    },
    (reject) => {
      console.log('requestMidiAccess reject', reject);
    }
  );

}

function testLoop (outputDevice, index, lastIndex) {
  let messageObjectOn = {command: StatusMap.NOTE_ON, status: index, note: 56, value: 127};
  let messageObjectOff = {command: StatusMap.NOTE_OFF, status: lastIndex, note: 56, value: 127};
  let messageOn = getMessageFromObject(messageObjectOn);
  let messageOff = getMessageFromObject(messageObjectOff);

  outputDevice.send(messageOn);
  outputDevice.send(messageOff, performance.now() + 500.0);

  setTimeout(function () {
    let li2 = index;
    let i2 = (index + 1) % 8;
    testLoop(outputDevice, i2, li2);
  }, 200);
}


export default initMidi;
