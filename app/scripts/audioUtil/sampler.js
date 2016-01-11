import generateUniqueId from './uniqueGenerator.js';

export default class Sampler {

  constructor (audioContext, output, sample) {
    this.audioContext = audioContext;
    this.semitoneRatio = Math.pow(2, 1/12);
  	this.input = this.audioContext.createGain();

    if (output) {
      this.connectTo(output);
    }
    if (sample) {
      this.setSample(sample);
    }
    this.uniqueId = generateUniqueId();
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

  getOutput () {
    return this.input;
  }

  connectTo (outputNode) {
      this.input.connect(outputNode);
  }

}
