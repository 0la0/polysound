import Sampler from './sampler.js';
import Synth from './synth.js';
import InputNode from './inputNode.js';

export default class InstrumentFactory {

  constructor (audioContext) {
    this.audioContext = audioContext;
  }

  createSynth () {
    return new Synth(this.audioContext);
  }

  createSampler (outputNode) {
    return new Sampler(this.audioContext, outputNode);
  }

  createInputNode () {
    return new InputNode(this.audioContext);
  }

}
