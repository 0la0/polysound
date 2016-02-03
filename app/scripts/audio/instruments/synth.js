import BaseInstrument from './baseInstrument.js';
import adsrBuilder from '../util/adsr.js';

export default class Synth extends BaseInstrument {

  constructor (audioContext) {
    super(audioContext);
    this.oscilators = {
      SINE: 'sine',
      SQUARE: 'square',
      SAWTOOTH: 'sawtooth',
      TRIANGLE: 'triangle'
    };
    this.setOscilator('SINE');
    this.baseFreq = 440;
    this.continuousOsc = this.audioContext.createOscillator();
  }

  play (pitch, schedule) {
    let sampleLength = this.adsr.attack + this.adsr.sustain + this.adsr.release;
    let adsrEnvelope = adsrBuilder(this.audioContext, this.input, schedule, this.adsr);

    let osc = this.audioContext.createOscillator();
    osc.connect(adsrEnvelope);
    osc.type = this.activeOscilator;
    osc.frequency.value = this.baseFreq * Math.pow(this.semitoneRatio, pitch);
    osc.start(schedule);
    osc.stop(schedule + sampleLength);
  }

  setOscilator (type) {
    this.activeOscilator = this.oscilators[type] || this.oscilators.SINE;
  }

  setBaseFrequency (baseFrequency) {
    this.baseFreq = baseFrequency;
    this.continuousOsc.frequency.value = this.baseFreq * Math.pow(this.semitoneRatio, 0);
  }

  start () {
    this.continuousOsc = this.audioContext.createOscillator();
    this.continuousOsc.connect(this.input);
    this.continuousOsc.type = this.activeOscilator;
    this.continuousOsc.frequency.value = this.baseFreq * Math.pow(this.semitoneRatio, 0);
    this.continuousOsc.start(0);
  }

  stop () {
    this.continuousOsc.stop(0);
  }

}
