import Equalizer from './equalizer.js';

export default class Channel {

  constructor (audioContext, input, outputList) {
    //this.semitoneRatio = Math.pow(2, 1/12);
    //this.chId = chId;
    this.input = audioContext.createGain();
    //this.eq = new Equalizer(audioContext);
    this.mainGain = audioContext.createGain();


    //this.mainGain.connect(output);
    //this.sendOut = [audioContext.createGain(), audioContext.createGain()];

    this.eq = new Equalizer(audioContext, this.input, [this.mainGain]);

    outputList.forEach((audioNode) => this.mainGain.connect(audioNode));


    //connect eqHi to all the sendOuts
    // for (var i = 0; i < this.sendOut.length; i++){
    // 	this.eq.hi.connect(this.sendOut[i]);
    // }
    // this.eq.hi.connect(this.mainGain);
    // this.input.connect(this.eq.lo);
  }

  setGain () {
    this.mainGain.gain.value = val;
  }

}
