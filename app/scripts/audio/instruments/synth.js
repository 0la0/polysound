import BaseInstrument from './baseInstrument.js';
import adsrBuilder from '../util/adsr.js';

export default class Synth extends BaseInstrument {

  constructor (audioContext) {
    super(audioContext);
  }

  play (pitch, schedule) {
    let sampleLength = this.adsr.attack + this.adsr.sustain + this.adsr.release;
    let adsrEnvelope = adsrBuilder(this.audioContext, this.input, schedule, this.adsr);

    let osc = this.audioContext.createOscillator();
    osc.connect(adsrEnvelope);
    osc.type = 'sine'; //sine, square, sawtooth, triangle
    osc.frequency.value = this.baseFreq * Math.pow(this.semitoneRatio, pitch);
    osc.start(schedule);
    osc.stop(schedule + sampleLength);
  }

}
