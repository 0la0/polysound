import generateUniqueId from './uniqueGenerator.js';

export default class BaseInstrument {

  constructor (audioContext) {
    this.audioContext = audioContext;
    this.input = this.audioContext.createGain();
    this.semitoneRatio = Math.pow(2, 1/12);
  	this.baseFreq = 440;
    this.uniqueId = generateUniqueId();

    this.attack = 0.1;
    this.sustain = 0.5; //=> 500ms
    this.release = 0.1;
  }

  getOutput () {
    return this.input;
  }

  connectTo (outputNode) {
      this.input.connect(outputNode);
  }

  setAttack (attack) {
    this.attack = attack;
  }

  setDecay (decay) {
    this.decay = decay;
  }

  setRelease (release) {
    this.release = release;
  }

  play (pitch, schedule) {

  }

}
