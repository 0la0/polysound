import BaseInstrument from './baseInstrument.js';

export default class Sampler extends BaseInstrument {

  constructor (audioContext) {
    super (audioContext);
  }

  setSample (sample) {
    this.sample = sample;
  }

  play (pitch, schedule) {
    var source = this.audioContext.createBufferSource();
  	source.buffer = this.sample;
  	if (pitch) {
  		source.playbackRate.value = Math.pow(this.semitoneRatio, pitch);
  	}
  	source.connect(this.input);
  	source.start(schedule);
  }

}
