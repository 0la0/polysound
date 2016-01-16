import generateUniqueId from '../util/uniqueGenerator.js';

export default class BaseInstrument {

  constructor (audioContext) {
    this.audioContext = audioContext;
    this.input = this.audioContext.createGain();
    this.semitoneRatio = Math.pow(2, 1/12);
  	this.baseFreq = 440;
    this.uniqueId = generateUniqueId();

    // 0.5 => 500ms
    this.adsr = {
      attack: 0.01,
      decay: 0.02,
      sustain: 0.5,
      release: 0.1
    };
  }

  getOutput () {
    return this.input;
  }

  connectTo (outputNode) {
      this.input.connect(outputNode);
  }

  setAttack (attack) {
    this.adsr.attack = attack;
  }

  setDecay (decay) {
    this.adsr.decay = decay;
  }

  setSustain (sustain) {
    this.adsr.sustain = sustain;
  }

  setRelease (release) {
    this.adsr.release = release;
  }

  //play (pitch, schedule) {}

}
