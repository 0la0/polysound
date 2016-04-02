
export default class Lfo {

  constructor (audioContext) {
    this.audioContext = audioContext;
    this.lfoGain = audioContext.createGain();
    this.lfoGain.gain.value = 0.5;

    this.oscilators = {
      SINE: 'sine',
      SQUARE: 'square',
      SAWTOOTH: 'sawtooth',
      TRIANGLE: 'triangle'
    };
    this.activeType = this.oscilators.SINE;
  }

  setFrequency (frequencyValue) {
    this.osc.frequency.value = frequencyValue;
  }

  setOscilator (type) {
    this.activeType = this.oscilators[type];
    if (this.osc) {
      this.osc.type = this.activeType;
    }
  }

  start () {
    this.osc = this.audioContext.createOscillator();
    this.osc.frequency.value = 4;
    this.osc.type = this.activeType;
    this.osc.connect(this.lfoGain);
    this.lfoGain.connect(this.modulatable);
    this.osc.start(0);
  }

  stop () {
    this.osc.stop(0);
  }

  setModulatable (modulatable) {
    this.modulatable = modulatable;
  }

}
