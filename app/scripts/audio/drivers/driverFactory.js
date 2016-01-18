import Sequencer from './sequencer.js';

export default class DriverFactory {

  constructor (audioContext) {
    this.audioContext = audioContext;
  }

  createSequencer () {
    return new Sequencer(this.audioContext);
  }

  getDriverList () {
    return ['sequencer'];
  }

}
