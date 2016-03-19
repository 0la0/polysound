/**
 *  Waveshaper curves, see:
 *  https://developer.mozilla.org/en-US/docs/Web/API/WaveShaperNode
 *  https://github.com/Theodeus/tuna/blob/master/tuna.js (specifically waveshaperAlgorithms section)
 *  http://music.columbia.edu/cmc/MusicAndComputers/chapter4/04_06.php
 */

import BaseEffect from './BaseEffect.js';

export default class Waveshaper extends BaseEffect {

  constructor (audioContext, buffer) {
    super(audioContext);
    this.input = this.audioContext.createGain();

    this.waveshaperNode = this.audioContext.createWaveShaper();
    this.waveshaperNode.curve = createDistortionCurve(50, this.audioContext.sampleRate);

    this.input.connect(this.waveshaperNode);
    this.waveshaperNode.connect(this.mainGain);
  }

}

function createDistortionCurve (amount, sampleRate) {
  let curve = new Float32Array(sampleRate);
  let degree = Math.PI / 180;

  for (let i = 0; i < sampleRate; ++i) {
    let x = i * 2 / sampleRate - 1;
    curve[i] = ( 3 + amount ) * x * 20 * degree / ( Math.PI + amount * Math.abs(x) );
  }

  return curve;
}
