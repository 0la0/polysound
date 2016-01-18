import generateUniqueId from '../util/uniqueGenerator.js';

export default class BaseEffect {

  constructor (audioContext) {
    this.audioContext = audioContext;
    this.mainGain = audioContext.createGain();
    this.uniqueId = generateUniqueId();
  }

  getInput () {
    return this.input;
  }

  getOutput () {
    return this.mainGain;
  }

  connectTo (outputNode) {
    this.mainGain.connect(outputNode);
  }

}
