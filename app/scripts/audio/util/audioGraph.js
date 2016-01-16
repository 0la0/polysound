
export default class AudioGraph {

  constructor () {
    this.audioContext = new AudioContext();
    this.masterCompressor = this.audioContext.createDynamicsCompressor();
    this.dry = this.audioContext.createGain();
    this.wet = this.audioContext.createGain();

    this.masterCompressor.connect(this.audioContext.destination);
    this.dry.connect(this.masterCompressor);
    this.wet.connect(this.masterCompressor);

    // this.send = [
    //   new Reverb(0, audioContext, this.wet)),
    //   new Delay(1, audioContext, this.wet))
    // ];

    this.effectChannelList = [];
    this.dryChannelList = [];
  }

  getCurrentTime () {
    return this.audioContext.currentTime;
  }

  getAudioContext () {
    return this.audioContext;
  }

  // addSynth (synth) {
  //
  // }
  //
  // addSampler (sampler) {
  //
  // }

}
