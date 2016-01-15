import BaseInstrument from './baseInstrument.js';
//import generateUniqueId from './uniqueGenerator.js';

export default class Synth extends BaseInstrument {

  constructor (audioContext) {
    super(audioContext);
  }

  play (pitch, schedule, duration) {
    if (duration === undefined) {
      duration = 0.1;
    }

    var osc = this.audioContext.createOscillator();
    osc.connect(this.input);

    var frequency = this.baseFreq * Math.pow(this.semitoneRatio, pitch);
    osc.type = 'sine'; //sine, square, sawtooth, triangle
    osc.frequency.value = frequency;
    osc.start(schedule);
    osc.stop(schedule + duration);
  }

}
