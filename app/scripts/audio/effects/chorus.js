import BaseEffect from './BaseEffect.js';

export default class Chorus extends BaseEffect {

  constructor (audioContext) {
    super(audioContext);

    this.input = this.audioContext.createGain();

    this.delay = this.audioContext.createDelay();
    this.delay.delayTime.value = 0.2; //delay => input.delayTime.value

    this.lfo = this.audioContext.createOscillator();
    this.lfo.type = 'sine';
    this.lfo.frequency.value = 0.8; //speed => lfo frequency

    this.lfoGain = this.audioContext.createGain();
    this.lfoGain.gain.value = 0.8; //depth => gain.gain.value

    this.lfo.connect(this.lfoGain);
    this.lfoGain.connect(this.delay.delayTime);
    this.lfo.start(0);

    this.delay.connect(this.mainGain);
    this.input.connect(this.mainGain);
    this.input.connect(this.delay);
  }


}
