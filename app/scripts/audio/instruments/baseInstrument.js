import generateUniqueId from '../util/uniqueGenerator.js';

export default class BaseInstrument {

  constructor (audioContext) {
    this.audioContext = audioContext;
    this.output = this.audioContext.createGain();
    this.semitoneRatio = Math.pow(2, 1/12);
    this.uniqueId = generateUniqueId();

    // 0.5 => 500ms
    this.adsr = {
      attack: 0.01,
      decay: 0.0,
      sustain: 0.5,
      release: 0.1
    };
  }

  getOutput () {
    return this.output;
  }

  connectTo (outputNode) {
    this.output.connect(outputNode);
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

  getPlayLength () {
    return Object.keys(this.adsr)
      .reduce((sum, key) => sum + this.adsr[key], 0);
  }

}
