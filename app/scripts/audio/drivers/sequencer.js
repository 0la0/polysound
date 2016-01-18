import BaseDriver from './baseDriver.js';

export default class Sequencer extends BaseDriver {

  constructor (audioContext) {
    super(audioContext);
    this.clipList = [];
  }

}
