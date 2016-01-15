import BaseInstrument from './baseInstrument.js';
import adsrBuilder from './adsr.js';

export default class Sampler extends BaseInstrument {

  constructor (audioContext) {
    super (audioContext);
  }

  setSample (sample) {
    this.sample = sample;
  }

  play (pitch, schedule) {
    let adsr = adsrBuilder(this.audioContext, this.input, schedule, this.attack, this.sustain, this.release);
    let source = this.audioContext.createBufferSource();
    source.buffer = this.sample;
    source.connect(adsr);
    source.start(schedule);
  }

}
