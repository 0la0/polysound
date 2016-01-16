import generateUniqueId from '../util/uniqueGenerator.js';

export default class Equalizer {

  constructor (audioContext, input, outputList) {
    this.lo = audioContext.createBiquadFilter();
    this.lo.type = 'lowshelf';
    this.lo.frequency.value = 300;
    this.mid = audioContext.createBiquadFilter();
    this.mid.type = 'peaking';
    this.mid.frequency.value = 1000;
    this.hi = audioContext.createBiquadFilter();
    this.hi.type = 'highshelf';
    this.hi.frequency.value = 7000;
    this.gain = audioContext.createGain();

    this.hi.connect(this.gain);
    this.mid.connect(this.hi);
    this.lo.connect(this.mid);

    if (input) {
      this.setInput(input);
    }
    if (outputList) {
      outputList.forEach((outputNode) => this.setOutput(outputNode));
    }

    this.lo.gain.value = 0;
    this.mid.gain.value = 0;
    this.hi.gain.value = 0;
    this.gain.gain.value = 0.5;

    this.uniqueId = generateUniqueId();
  }

  getOutput () {
    return this.gain;
  }

  getInput () {
    return this.lo;
  }

  setInput (audioNode) {
    audioNode.connect(this.lo);
  }

  connectTo (audioNode) {
    this.gain.connect(audioNode);
  }

  /**
   *  helper methods for frequencies?
   */

}
