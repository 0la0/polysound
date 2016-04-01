
export default class Synth {

  constructor (audioContext, semitoneRatio) {
    this.audioContext = audioContext;
    this.semitoneRatio = semitoneRatio;
    this.oscilators = {
      SINE: 'sine',
      SQUARE: 'square',
      SAWTOOTH: 'sawtooth',
      TRIANGLE: 'triangle'
    };
    this.setOscilator('SINE');
    this.baseFreq = 440;
  }

  play (pitch, schedule, adsrEnvelope, sampleLength) {
    let osc = this.audioContext.createOscillator();
    osc.connect(adsrEnvelope);
    osc.type = this.activeOscilator;
    osc.frequency.value = this.baseFreq * Math.pow(this.semitoneRatio, pitch);
    osc.start(schedule);
    osc.stop(schedule + sampleLength);
  }

  setOscilator (type) {
    this.activeOscilator = this.oscilators[type] || this.oscilators.SINE;
    if (this.continuousOsc) {
      this.continuousOsc.type = this.activeOscilator;
    }
  }

  setBaseFrequency (baseFrequency) {
    this.baseFreq = baseFrequency;
    if (this.continuousOsc) {
      this.continuousOsc.frequency.value = this.baseFreq * Math.pow(this.semitoneRatio, 0);
    }
  }

  //TODO: implement attack and release on start / stop methods
  start (output) {
    this.continuousOsc = this.audioContext.createOscillator();
    this.continuousOsc.connect(output);
    this.continuousOsc.type = this.activeOscilator;
    this.continuousOsc.frequency.value = this.baseFreq * Math.pow(this.semitoneRatio, 0);
    this.continuousOsc.start(0);
  }

  stop (output) {
    this.continuousOsc.disconnect(output);
    this.continuousOsc.stop(0);
  }

}
