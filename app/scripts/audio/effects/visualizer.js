import BaseEffect from './BaseEffect.js';

export default class Vizualizer extends BaseEffect {

  constructor (audioContext, source) {
    super(audioContext);
    this.source = source;
    this.analyser = this.audioContext.createAnalyser();
    this.connect();

    this.analyser.fftSize = 2048;
    this.timeDataArray = new Uint8Array(this.getBufferLength());
  }

  connect () {
    this.source.connect(this.analyser);
  }

  disconnect () {
    this.source.disconnect(this.analyser);
  }

  getBufferLength () {
    return this.analyser.frequencyBinCount;
  }

  getTimeData () {
    this.analyser.getByteTimeDomainData(this.timeDataArray);
    return this.timeDataArray;
  }

}
