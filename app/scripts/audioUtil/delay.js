import generateUniqueId from './uniqueGenerator.js';

export default class Delay {

  constructor (context, output) {
    this.input = context.createDelay();
    this.feedback = context.createGain();
    this.wetLevel = context.createGain();

    this.input.delayTime.value = 0.25; //250 ms delay
    this.feedback.gain.value = 0.85;
    this.wetLevel.gain.value = 0.80;

    this.mainGain = context.createGain();

    this.mainGain.connect(output);
    this.wetLevel.connect(this.mainGain);
    this.feedback.connect(this.input);
    this.input.connect(this.wetLevel);
    this.input.connect(this.feedback);

    this.uniqueId = generateUniqueId();
  }

  setQuatization (tempo, delayTime) {
    //var temp = this.feedback.gain.value;
  	//this.feedback.gain.value = 0;
    this.input.delayTime.value = (tempo / 1000) / delayTime;
  	//this.feedback.gain.value = temp;
  }

  getInput () {
    return this.input;
  }

}
