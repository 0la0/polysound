import BaseEffect from './BaseEffect.js';

export default class Delay extends BaseEffect {

  constructor (audioContext) {
    super(audioContext);
    this.input = this.audioContext.createDelay();
    this.feedback = this.audioContext.createGain();
    this.wetLevel = this.audioContext.createGain();

    this.feedback.gain.value = 0.85;
    this.wetLevel.gain.value = 0.80;
    this.connectDelayNodes();
  }

  setQuatization (tempo, delayTime) {
    this.disconnectDelayNodes();
    setTimeout(() => {
      this.connectDelayNodes();
      this.input.delayTime.value = (tempo / 1000) / delayTime;
    }, 0);
  }

  disconnectDelayNodes () {
    this.input.disconnect(this.wetLevel);
    this.input.disconnect(this.feedback);
    this.wetLevel.disconnect(this.mainGain);
  }

  connectDelayNodes () {
    this.wetLevel.connect(this.mainGain);
    this.feedback.connect(this.input);
    this.input.connect(this.wetLevel);
    this.input.connect(this.feedback);
  }

}
