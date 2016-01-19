import AudioGraph from './audio/util/audioGraph.js';
import Metronome from './audio/util/metronome.js';
import Scheduler from './audio/util/scheduler.js';
import InstrumentFactory from './audio/instruments/instrumentFactory.js';
import EffectFactory from './audio/effects/effectFactory.js';
import DriverFactory from './audio/drivers/driverFactory.js';
import Http from './util/http.js';

const NUM_SYNTHS = 1;
const NUM_SAMPLERS = 2;
const NUM_EQUALIZERS = 3;

var audioGraph = new AudioGraph();
var scheduler = new Scheduler(audioGraph.getAudioContext());
var metronome = new Metronome(audioGraph.getAudioContext(), scheduler);
var effectFactory = new EffectFactory(audioGraph.getAudioContext());
var instrumentFactory = new InstrumentFactory(audioGraph.getAudioContext());

var filePaths = [
  'audioSamples/snare_loFi_bright.wav',
  'audioSamples/woodClog55.wav'
];
var samples = [];
var bufferPaths = ['audioSamples/matrix-reverb1.wav'];
var buffers = [];

var samplerList = buildSamplers();
var synthList = buildSynths();
var equalizerList = buildEqualizers();
var lastEqualizerList = buildLastEqualizers();
var driverFactory = new DriverFactory(audioGraph.getAudioContext());

var audio = {
  audioGraph: audioGraph,
  metronome: metronome,
  samplerList: samplerList,
  synthList: synthList,
  equalizerList: equalizerList,
  lastEqualizerList: lastEqualizerList,
  sends: {
    delay: effectFactory.createDelay(),
    reverb: effectFactory.createReverb()
  },
  tempEqualizer: effectFactory.createEqualizer(),
  driverFactory: driverFactory,
  driverList: []
};

//window.audio = audio;

function buildSamplers () {
  var samplerList = [];
  for (var i = 0; i < NUM_SAMPLERS; i++) {
    let sampler = instrumentFactory.createSampler();
    samplerList.push(sampler);
  }
  return samplerList;
}

function buildSynths () {
  var synthList = [];
  for (var i = 0; i < NUM_SYNTHS; i++) {
    let synth = instrumentFactory.createSynth();
    synthList.push(synth);
  }
  return synthList;
}

function buildEqualizers () {
  let eqList = [];
  for (var i = 0; i < NUM_EQUALIZERS; i++) {
    let eq = effectFactory.createEqualizer();
    eqList.push(eq);
  }
  return eqList;
}

function buildLastEqualizers () {
  let eqList = [];
  for (var i = 0; i < NUM_EQUALIZERS; i++) {
    let eq = effectFactory.createEqualizer();
    eq.connectTo(audioGraph.masterCompressor);
    eqList.push(eq);
  }
  return eqList;
}

function loadSamples () {
  var audioContext = audioGraph.getAudioContext();

  filePaths.forEach((path, index) => {
    Http.getAudioSample(path, audioContext)
      .then((response) => {
        samples.push(response.data);
        audio.samplerList[index].setSample(response.data);
      });
  });

  bufferPaths.forEach((path, index) => {
    Http.getAudioSample(path, audioContext)
      .then((response) => {
        buffers.push(response.data);
        audio.sends.reverb.setBuffer(response.data);
      });
  });

}

function loadConfigFiles () {
  Http.get('config/example.json')
    .then((resolve) => console.log(resolve.data));
}


//loadConfigFiles();
loadSamples();
export {audio, scheduler};
