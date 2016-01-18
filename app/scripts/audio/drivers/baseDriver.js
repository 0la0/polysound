import generateUniqueId from '../util/uniqueGenerator.js';

export default class BaseDriver {

  constructor (audioContext) {
    this.audioContext = audioContext;
    this.uniqueId = generateUniqueId();
  }

}
