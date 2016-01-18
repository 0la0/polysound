import BaseEffect from './BaseEffect.js';
//import generateUniqueId from '../util/uniqueGenerator.js';

export default class Delay extends BaseEffect {

  constructor (audioContext) {
    super(audioContext);

    this.input = this.audioContext.createDelay();
    this.feedback = this.audioContext.createGain();
    this.wetLevel = this.audioContext.createGain();

    this.input.delayTime.value = 0.25; //250 ms delay
    this.feedback.gain.value = 0.85;
    this.wetLevel.gain.value = 0.80;

    this.wetLevel.connect(this.mainGain);
    this.feedback.connect(this.input);
    this.input.connect(this.wetLevel);
    this.input.connect(this.feedback);
  }

  setQuatization (tempo, delayTime) {
    //var temp = this.feedback.gain.value;
  	//this.feedback.gain.value = 0;
    this.input.delayTime.value = (tempo / 1000) / delayTime;
  	//this.feedback.gain.value = temp;
  }


}
