import BaseEffect from './BaseEffect.js';

export default class Vizualizer extends BaseEffect {

  constructor (audioContext, source) {
    super(audioContext);
    this.source = source;
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = Math.pow(2, 11);
    this.timeDataArray = new Uint8Array(this.getBufferLength());
    this.freqDataArray = new Uint8Array(this.getBufferLength());
    this.sampleRate = this.audioContext.sampleRate;
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

  getFrequencyData () {
    this.analyser.getByteFrequencyData(this.freqDataArray);
    return this.freqDataArray;
  }

  getHzPerBin () {
    // note that the number of bins is half the fftSize
    return this.sampleRate / this.analyser.fftSize;
  }

}
