import BaseInstrument from './baseInstrument.js';
import adsrBuilder from '../util/adsr.js';

export default class Sampler extends BaseInstrument {

  constructor (audioContext) {
    super (audioContext);
    this.hasSample = false;
  }

  setSample (sample) {
    this.sample = sample;
    this.hasSample = true;
  }

  play (pitch, schedule) {
    let adsrEnvelope = adsrBuilder(this.audioContext, this.input, schedule, this.adsr);
    let source = this.audioContext.createBufferSource();
    source.buffer = this.sample;
    source.connect(adsrEnvelope);
    source.playbackRate.value = Math.pow(this.semitoneRatio, pitch);
    source.start(schedule);
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

}
