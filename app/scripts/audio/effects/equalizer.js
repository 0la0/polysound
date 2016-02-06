import BaseEffect from './BaseEffect.js';

export default class Equalizer extends BaseEffect {

  constructor (audioContext, input, outputList) {
    super(audioContext);

    this.lo = this.audioContext.createBiquadFilter();
    this.lo.type = 'lowshelf';
    this.lo.frequency.value = 300;
    this.mid = this.audioContext.createBiquadFilter();
    this.mid.type = 'peaking';
    this.mid.frequency.value = 1000;
    this.hi = this.audioContext.createBiquadFilter();
    this.hi.type = 'highshelf';
    this.hi.frequency.value = 7000;

    this.hi.connect(this.mainGain);
    this.mid.connect(this.hi);
    this.lo.connect(this.mid);

    this.lo.gain.value = 0;
    this.mid.gain.value = 0;
    this.hi.gain.value = 0;
    this.mainGain.gain.value = 0.5;

    this.input = this.lo;
  }

}
