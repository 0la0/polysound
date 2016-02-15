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

function buildMidiFactory () {
  if (!navigator.requestMIDIAccess) {
    console.warn('WebMidiApi not supported in this browser');
    return;
  }

  return navigator.requestMIDIAccess().then(
    (resolveMidiAccess) => {
      return new MidiDeviceFactory(resolveMidiAccess);
    }
  );

}

export default buildMidiFactory;
