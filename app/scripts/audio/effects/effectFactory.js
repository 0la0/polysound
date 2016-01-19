import Equalizer from './equalizer.js';
import Delay from './delay.js';
import Reverb from './reverb.js';

export default class EffectFactory {

  constructor (audioContext) {
    this.audioContext = audioContext;
  }

  createEqualizer () {
    return new Equalizer(this.audioContext);
  }

  createDelay () {
    return new Delay(this.audioContext);
  }

  createReverb () {
    return new Reverb(this.audioContext);
  }

}
