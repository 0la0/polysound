import BaseInstrument from './baseInstrument.js';
import adsrBuilder from '../util/adsr.js';
import Synth from './synth.js';

export default class SynthContainer extends BaseInstrument {

  constructor (audioContext) {
    super(audioContext);

    this.synthList = [
      createSynthNode(this.audioContext, this.semitoneRatio),
      createSynthNode(this.audioContext, this.semitoneRatio),
      createSynthNode(this.audioContext, this.semitoneRatio)
    ];

    this.synthList.forEach(synth => synth.gain.connect(this.output));
  }

  play (pitch, schedule) {
    let sampleLength = this.adsr.attack + this.adsr.sustain + this.adsr.release;
    let adsrEnvelope = adsrBuilder(this.audioContext, this.output, schedule, this.adsr);
    this.synthList.forEach(obj => {
      let adsrEnvelope = adsrBuilder(this.audioContext, obj.gain, schedule, this.adsr);
      obj.synth.play(pitch, schedule, adsrEnvelope, sampleLength);
    });
  }

  setOscilator (index, type) {
    if (index < 0 || index >= this.synthList.length) {
      throw new Error('index out of bounds, SynthContainer.setOscilator', arguments);
    }
    this.synthList[index].synth.setOscilator(type);
  }

  start () {
    this.synthList.forEach((obj) => {
      obj.synth.start(obj.gain);
    });
  }

  stop () {
    this.synthList.forEach((obj) => {
      obj.synth.stop(obj.gain);
    });
  }

}

function createSynthNode (audioContext, semitoneRatio) {
  let gainNode = audioContext.createGain();
  gainNode.gain.value = 0.5;
  return {
    synth: new Synth(audioContext, semitoneRatio),
    gain: gainNode
  };
}
