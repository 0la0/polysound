import generateUniqueId from './uniqueGenerator.js';

export default class Synth {

  constructor (audioContext) {
    this.audioContext = audioContext;

    this.semitoneRatio = Math.pow(2, 1/12);
  	this.baseFreq = 440;
    this.uniqueId = generateUniqueId();
  }

  play (note, startTime, duration) {
    var osc = this.audioContext.createOscillator();
    osc.connect(this.audioContext.destination);

    var frequency = this.baseFreq * Math.pow(this.semitoneRatio, note);
    osc.type = 'sine'; //sine, square, sawtooth, triangle
    osc.frequency.value = frequency;
    osc.start(startTime);
    osc.stop(startTime + duration);
  }

}
