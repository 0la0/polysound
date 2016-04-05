// modeled after modDelay: https://github.com/cwilso/Audio-Input-Effects/blob/master/js/effects.js

import BaseEffect from './BaseEffect.js';

export default class Chorus extends BaseEffect  {

  constructor (audioContext) {
    super(audioContext);

    this.input = this.audioContext.createGain();

    this.delayNode = this.audioContext.createDelay();
    this.delayNode.delayTime.value = 0.1; //delayTime

    this.feedbackGain = this.audioContext.createGain();
    this.feedbackGain.gain.value = 0.1; //feedback

    this.chorus = this.audioContext.createDelay();
    this.chorus.delayTime.value = 0.03; //chorus delay

    this.lfo = this.audioContext.createOscillator();
    this.lfo.type = 'sine';
    this.lfo.frequency.value = 0.5; //chorus speed

    this.lfoGain = this.audioContext.createGain();
    this.lfoGain.gain.value = 0.003; //chorus depth

    this.lfo.connect(this.lfoGain);
    this.lfoGain.connect(this.chorus.delayTime);

    this.input.connect(this.delayNode);
    this.delayNode.connect(this.chorus);
    this.delayNode.connect(this.feedbackGain);
    this.chorus.connect(this.feedbackGain);
    this.feedbackGain.connect(this.delayNode);
    this.feedbackGain.connect(this.mainGain);

    this.lfo.start(0);
  }

}
