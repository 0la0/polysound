import BaseInstrument from './baseInstrument.js';
import adsrBuilder from '../util/adsr.js';

export default class Sampler extends BaseInstrument {

  constructor (audioContext) {
    super (audioContext);
  }

  setSample (sample) {
    this.sample = sample;
  }

  play (pitch, schedule) {
    let adsrEnvelope = adsrBuilder(this.audioContext, this.input, schedule, this.adsr);
    let source = this.audioContext.createBufferSource();
    source.buffer = this.sample;
    source.connect(adsrEnvelope);
    source.start(schedule);
  }

}
