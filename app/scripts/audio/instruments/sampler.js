import BaseInstrument from './baseInstrument.js';
import adsrBuilder from '../util/adsr.js';

export default class Sampler extends BaseInstrument {

  constructor (audioContext) {
    super (audioContext);
    this.hasSample = false;
    this.baseNote = 0;
  }

  setSample (sample) {
    this.sample = sample;
    this.hasSample = true;
  }

  play (pitch, schedule, samplePosition) {
    if (!schedule) {
      schedule = this.audioContext.currentTime;
    }
    let adsrEnvelope = adsrBuilder(this.audioContext, this.output, schedule, this.adsr);
    let source = this.audioContext.createBufferSource();
    source.buffer = this.sample;
    source.connect(adsrEnvelope);
    pitch += Math.round(this.baseNote);
    source.playbackRate.value = Math.pow(this.semitoneRatio, pitch);

    if (!samplePosition) {
      samplePosition = 0;
    }
    source.start(schedule, samplePosition, this.getPlayLength());
  }

  getWaveform (canvasWidth, cb) {
    //assume one channel for Now
    let peaks = [];
    let stepSize = Math.floor(this.sample.length / canvasWidth);
    let channel0 = this.sample.getChannelData(0);

    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    var loopCnt = 0;
    for (let i = 0; i < channel0.length; i += stepSize) {
      let value = channel0[i];
      if (value < min) min = value;
      if (value > max) max = value;
      peaks.push(value);
    }
    cb(peaks);
  }

  getDuration () {
    return this.sample.duration;
  }

}
