import BaseInstrument from './baseInstrument.js';
import adsrBuilder from './adsr.js';

export default class Synth extends BaseInstrument {

  constructor (audioContext) {
    super(audioContext);
  }

  play (pitch, schedule) {
    let sampleLength = this.attack + this.sustain + this.release;
    let adsr = adsrBuilder(this.audioContext, this.input, schedule, this.attack, this.sustain, this.release);

    let osc = this.audioContext.createOscillator();
    osc.connect(adsr);
    osc.type = 'sine'; //sine, square, sawtooth, triangle
    osc.frequency.value = this.baseFreq * Math.pow(this.semitoneRatio, pitch);
    osc.start(schedule);
    osc.stop(schedule + sampleLength);
  }

}
