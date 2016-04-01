import BaseInstrument from './baseInstrument.js';
import adsrBuilder from '../util/adsr.js';
import Synth from './synth.js';

export default class SynthContainer extends BaseInstrument {

  constructor (audioContext) {
    super(audioContext);

    this.synthList = [
      new Synth(this.audioContext, this.semitoneRatio),
      new Synth(this.audioContext, this.semitoneRatio),
      new Synth(this.audioContext, this.semitoneRatio)
    ];
  }

  play (pitch, schedule) {
    let sampleLength = this.adsr.attack + this.adsr.sustain + this.adsr.release;
    let adsrEnvelope = adsrBuilder(this.audioContext, this.output, schedule, this.adsr);
    this.synthList.forEach(synth => synth.play(pitch, schedule, adsrEnvelope, sampleLength));
  }

  setOscilator (index, type) {
    if (index < 0 || index >= this.synthList.length) {
      throw new Error('index out of bounds, SynthContainer.setOscilator', arguments);
    }
    this.synthList[index].setOscilator(type);
  }

  start () {
    this.synthList.forEach(synth => synth.start(this.output));
  }

  stop () {
    this.synthList.forEach(synth => synth.stop(this.output));
  }

}
