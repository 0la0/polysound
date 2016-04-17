/**
 * Credit: Matt Diamond:
 * http://matt-diamond.com/drone.html
 **/

import BaseEffect from './BaseEffect.js';

export default class DroneFilter extends BaseEffect {

  constructor (audioContext, input, outputList) {
    super(audioContext);

    const NUMBER_OF_FILTERS = 40;
    //TODO: let this.scale reference a map of possibile scales
    this.scale = [0.0, 2.0, 4.0, 6.0, 7.0, 9.0, 11.0, 12.0];
    this.baseFrequency = 440;
    this.input = this.audioContext.createGain();
    this.filterArray = createFilters(NUMBER_OF_FILTERS, this.baseFrequency, this.scale, this.audioContext);

    this.filterArray.forEach((filter) => {
      filter.connect(this.mainGain);
      this.input.connect(filter);
    });
    this.setBaseFrequency(this.baseFrequency);
  }

  setBaseFrequency (baseFrequency) {
    this.baseFrequency = baseFrequency;
    this.filterArray.forEach((filter) => {
      filter.connect(this.mainGain);
      this.input.connect(filter);
      filter.frequency.value = getRandomFrequency(this.baseFrequency, this.scale);
    });
  }

}

function createFilters (numFilters, baseFrequency, scale, audioContext) {
  return new Array(numFilters).fill(undefined)
    .map((value, index) => {
      let filter = audioContext.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.value = 50;
      return filter;
    });
}

function getRandomFrequency (baseFrequency, scaleArray) {
  let noteIndex = Math.floor(scaleArray.length * Math.random());
  let pitch = scaleArray[noteIndex];
  let semitoneRatio = Math.pow(2, 1/12);
  let frequency = baseFrequency * Math.pow(semitoneRatio, pitch);
  return frequency;
}
