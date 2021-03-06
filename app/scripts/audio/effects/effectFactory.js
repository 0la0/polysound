import Equalizer from './equalizer.js';
import Delay from './delay.js';
import Reverb from './reverb.js';
import Compressor from './compressor.js';
import DroneFilter from './droneFilter.js';
import Waveshaper from './Waveshaper.js';
import Lfo from './lfo.js';
import Chorus from './chorus.js';

export default class EffectFactory {

  constructor (audioContext) {
    this.audioContext = audioContext;
    this.reverbBufferMap = new Map();
  }

  createEqualizer () {
    return new Equalizer(this.audioContext);
  }

  createDelay () {
    return new Delay(this.audioContext);
  }

  createReverb (bufferName) {
    if (!bufferName) {
      bufferName = Array.from(this.reverbBufferMap.keys())[0];
    }
    return new Reverb(this.audioContext, this.reverbBufferMap.get(bufferName));
  }

  addReverbBuffer (bufferName, buffer) {
    this.reverbBufferMap.set(bufferName, buffer);
  }

  createCompressor () {
    return new Compressor(this.audioContext);
  }

  createDroneFilter () {
    return new DroneFilter(this.audioContext);
  }

  createWaveshaper () {
    return new Waveshaper(this.audioContext);
  }

  createLfo () {
    return new Lfo(this.audioContext);
  }

  createChorus () {
    return new Chorus(this.audioContext);
  }

}
