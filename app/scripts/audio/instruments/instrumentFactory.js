import Sampler from './sampler.js';
import SynthContainer from './synthContainer.js';
import InputNode from './inputNode.js';
import WhiteNoise from './whiteNoise.js';

export default class InstrumentFactory {

  constructor (audioContext) {
    this.audioContext = audioContext;
  }

  createSynth () {
    //return new Synth(this.audioContext);
    return new SynthContainer(this.audioContext);
  }

  createSampler (outputNode) {
    return new Sampler(this.audioContext, outputNode);
  }

  createInputNode () {
    return new InputNode(this.audioContext);
  }

  createWhiteNoiseNode () {
    return new WhiteNoise(this.audioContext);
  }

}
