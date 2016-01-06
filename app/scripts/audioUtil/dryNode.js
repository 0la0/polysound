import generateUniqueId from './uniqueGenerator.js';

export default class DryNode {

  constructor (context, output) {
    this.mainGain = context.createGain();
    this.mainGain.connect(output);
    this.uniqueId = generateUniqueId();
  }

  getInput () {
    return this.mainGain;
  }

}
