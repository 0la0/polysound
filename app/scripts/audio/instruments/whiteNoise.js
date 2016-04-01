import Sampler from './sampler.js';

export default class WhiteNoise extends Sampler {

  constructor (audioContext) {
    super(audioContext);
    let noiseBuffer = createBuffer(this.audioContext);
    this.setSample(noiseBuffer);
    this.continuousBuffer = null;
    this.detuneValue = 0;
  }

  start () {
    this.continuousBuffer = this.audioContext.createBufferSource();
    this.continuousBuffer.buffer = this.sample;
    this.continuousBuffer.connect(this.output);
    this.continuousBuffer.detune.value = this.detuneValue;
    this.continuousBuffer.loop = true;
    this.continuousBuffer.start(0);
  }

  stop () {
    this.continuousBuffer.stop(0);
    this.continuousBuffer.disconnect(this.output);
    this.continuousBuffer = null;
  }

  setDetuneValue (detuneValue) {
    this.detuneValue = detuneValue
    if (this.continuousBuffer) {
      this.continuousBuffer.detune.value = this.detuneValue;
    }
  }

}

function createBuffer (audioContext) {
  var frameCount = audioContext.sampleRate * 2.0; //two second buffer
  let buffer = audioContext.createBuffer(2, frameCount, audioContext.sampleRate);
  let leftChannel = buffer.getChannelData(0);
  let rightChannel = buffer.getChannelData(1);

  for (var i = 0; i < frameCount; i++) {
   leftChannel[i] = 2 * Math.random() - 1;
   rightChannel[i] = 2 * Math.random() - 1;
  }
  return buffer;
}
