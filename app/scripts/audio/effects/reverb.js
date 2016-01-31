import BaseEffect from './BaseEffect.js';

export default class Reverb extends BaseEffect {

  constructor (audioContext, buffer) {
    super(audioContext);
    this.input = this.audioContext.createConvolver();
    this.input.connect(this.mainGain);

    if (buffer) {
      this.setBuffer(buffer);
    }
  }

  setBuffer (buffer) {
    this.input.buffer = buffer;
  }

}
