import generateUniqueId from './uniqueGenerator.js';

export default class Synth {

  constructor (audioContext) {
    this.audioContext = audioContext;
    this.input = this.audioContext.createGain();

    this.semitoneRatio = Math.pow(2, 1/12);
  	this.baseFreq = 440;

    this.uniqueId = generateUniqueId();
  }

  play (pitch, startTime, duration) {
    if (duration === undefined) {
      duration = 0.1;
    }
    
    var osc = this.audioContext.createOscillator();
    osc.connect(this.input);

    var frequency = this.baseFreq * Math.pow(this.semitoneRatio, pitch);
    osc.type = 'sine'; //sine, square, sawtooth, triangle
    osc.frequency.value = frequency;
    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  getOutput () {
    return this.input;
  }

  connectTo (outputNode) {
      this.input.connect(outputNode);
  }

}
