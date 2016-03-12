import AudioGraph from './audio/util/audioGraph.js';
import Metronome from './audio/util/metronome.js';
import Scheduler from './audio/util/scheduler.js';
import InstrumentFactory from './audio/instruments/instrumentFactory.js';
import EffectFactory from './audio/effects/effectFactory.js';
import buildMidiFactory from './midi/midiFactory.js';
import Http from './util/http.js';

const CONFIG_FILE_PATH = 'config/example.json';
const NUM_SYNTHS = 1;
const NUM_SAMPLERS = 3;
const NUM_EQUALIZERS = 3;

let audioGraph = new AudioGraph();
let scheduler = new Scheduler(audioGraph.getAudioContext());
let metronome = new Metronome(audioGraph.getAudioContext(), scheduler);
let effectFactory = new EffectFactory(audioGraph.getAudioContext());
let instrumentFactory = new InstrumentFactory(audioGraph.getAudioContext());
let sampleMap = new Map();
let sampleList = [];
let lastEqualizerList = buildLastEqualizers();

let audio = {
  audioGraph: audioGraph,
  metronome: metronome,
  sampleMap: sampleMap,
  lastEqualizerList: lastEqualizerList,
  effectFactory: effectFactory,
  instrumentFactory: instrumentFactory
};
//window.audio = audio;

function buildLastEqualizers () {
  let eqList = [];
  for (var i = 0; i < NUM_EQUALIZERS; i++) {
    let eq = effectFactory.createEqualizer();
    eq.connectTo(audioGraph.masterCompressor);
    eqList.push(eq);
  }
  return eqList;
}

function loadAudioSamples(fileList, audioContext) {
  fileList.forEach((filePath, index) => {
    Http.getAudioSample(filePath, audioContext)
      .then((response) => {
        sampleMap.set(filePath, response.data);
      });
  });
}

function loadReverbBuffers(fileList, audioContext) {
  fileList.forEach((filePath) => {
    Http.getAudioSample(filePath, audioContext)
      .then((response) => {
        effectFactory.addReverbBuffer(filePath, response.data);
      });
  });
}

function loadConfigFiles (configFilePath, audioContext) {
  Http.get(configFilePath)
    .then((resolve) => {
      let samplePathList = resolve.data.sampleList;
      let reverbBufferList = resolve.data.reverbBufferList;
      loadAudioSamples(samplePathList, audioContext);
      loadReverbBuffers(reverbBufferList, audioContext);
    })
    .catch((error) => {
      console.log('loadConfigFiles error:', error);
    });
}

function init () {
  buildMidiFactory()
    .then( (midiFactoryInstance) => {
      audio.midiDeviceFactory = midiFactoryInstance;
    })
    .catch(() => {midiFactory = {}});

  loadConfigFiles(CONFIG_FILE_PATH, audioGraph.getAudioContext());
}


init();
export {audio, scheduler};
