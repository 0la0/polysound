import BaseEffect from './BaseEffect.js';

export default class Compressor extends BaseEffect {

  constructor (audioContext) {
    super(audioContext);

    this.input = this.audioContext.createDynamicsCompressor();
    this.input.connect(this.mainGain);

    this.input.threshold.value = -50;
    this.input.knee.value = 40;
    this.input.ratio.value = 12;
    this.input.reduction.value = -20;
    this.input.attack.value = 0;
    this.input.release.value = 0.25;
  }


}
