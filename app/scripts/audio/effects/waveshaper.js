/**
 *  Waveshaper curves, see:
 *  https://developer.mozilla.org/en-US/docs/Web/API/WaveShaperNode
 *  https://github.com/Theodeus/tuna/blob/master/tuna.js (specifically waveshaperAlgorithms section)
 *  http://music.columbia.edu/cmc/MusicAndComputers/chapter4/04_06.php
 *  http://msp.ucsd.edu/techniques/v0.11/book-html/node78.html
 */

import BaseEffect from './BaseEffect.js';

export default class Waveshaper extends BaseEffect {

  constructor (audioContext, buffer) {
    super(audioContext);
    this.input = this.audioContext.createGain();
    this.waveshaperNode = this.audioContext.createWaveShaper();
    this.input.connect(this.waveshaperNode);
    this.waveshaperNode.connect(this.mainGain);
  }

  getCarrierFunctions () {
    return Object.keys(CARRIER_FUNCTIONS);
  }

  setCarrierFunction (functionKey) {
    let carrierFunction = CARRIER_FUNCTIONS[functionKey];
    (carrierFunction) ?
      this.waveshaperNode.curve = createCurve(carrierFunction, this.audioContext.sampleRate, 50) :
      console.warn('Waveshkaper.setCarrierFunction error, invalid function key');
  }

}

function createCurve (carrierFunction, sampleRate, multiplier) {
  let curve = new Float32Array(sampleRate);
  for (let i = 0; i < sampleRate; i++) {
    //adjust x such that the curve is centered in its domain
    let x = i * 2 / sampleRate - 1;
    //sigmoid with fast dropoff, range is (-1, 1)
    curve[i] = carrierFunction(x, multiplier, sampleRate);
  }
  return curve;
}

const CARRIER_FUNCTIONS = {

  Square: (x) => {
    return Math.pow(x, 2);
  },

  Cubed: (x) => {
    return Math.pow(x, 3);
  },

  Chebyshev2: (x) => {
    return 2 * Math.pow(x, 2) - 1;
  },

  Chebyshev3: (x) => {
    return 4 * Math.pow(x, 3) - 3 * x;
  },

  Chebyshev4: (x) => {
    return 8 * Math.pow(x, 4) - 8 * Math.pow(x, 2) + 1;
  },

  Sigmoid: (x) => {
    return 2 / (1 + Math.exp(-4 * x)) - 1;
  },

  Sigmoid2: (x) => {
    return 1.5 / (1 + Math.exp(-10 * x)) - 0.75;
  },

  SigmoidLike: (x, multiplier) => {
    return ( 3 + multiplier ) * x * 20 * (Math.PI / 180) / ( Math.PI + multiplier * Math.abs(x) );
  },

  HardClip: (x, multiplier, sampleRate) => {
    return (1 + 0.4 * x) / (1 + Math.abs(x));
  }

};
