import generateUniqueId from '../util/uniqueGenerator.js';

export default class Reverb {

  constructor (audioContext, output, buffer) {
    this.input = audioContext.createConvolver();
    this.mainGain = audioContext.createGain();
    this.mainGain.connect(output);
    this.input.connect(this.mainGain);

    this.uniqueId = generateUniqueId();
    if (buffer) {
      this.setBuffer(buffer);
    }
  }

  setBuffer (buffer) {
    this.input.buffer = buffer;
  }

  getInput () {
    return this.input;
  }

}
