import Sampler from './sampler.js';
import Synth from './synth.js';

export default class InstrumentFactory {

  constructor (audioContext) {
    this.audioContext = audioContext;
  }

  createSynth () {
    var synth = new Synth(this.audioContext);
    return synth;
  }

  createSampler (outputNode) {
    var sampler = new Sampler(this.audioContext, outputNode);
    return sampler;
  }

}
