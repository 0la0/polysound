import AudioGraph from './audioUtil/audioGraph.js';
import Metronome from './audioUtil/metronome.js';
import Sampler from './audioUtil/sampler.js';
import Equalizer from './audioUtil/equalizer.js';
import Delay from './audioUtil/delay.js';
import Reverb from './audioUtil/reverb.js';
import DryNode from './audioUtil/dryNode.js';
import Http from './util/http.js';



const NUM_SAMPLERS = 2;
const NUM_EQUALIZERS = 3;

var audioGraph = new AudioGraph();
var metronome = new Metronome(audioGraph.getAudioContext(), scheduleNote);
var filePaths = [
  'audioSamples/snare_loFi_bright.wav',
  'audioSamples/woodClog55.wav'
];
var samples = [];
var bufferPaths = ['audioSamples/matrix-reverb1.wav'];
var buffers = [];

var samplerList = buildSamplers();
var equalizerList = buildEqualizers();

var audio = {
  audioGraph: audioGraph,
  metronome: metronome,
  samplerList: samplerList,
  equalizerList: equalizerList,
  sends: {
    delay: new Delay(audioGraph.getAudioContext(), audioGraph.wet),
    reverb: new Reverb(audioGraph.getAudioContext(), audioGraph.wet)
  },
  dry: new DryNode(audioGraph.getAudioContext(), audioGraph.dry)
};

function buildSamplers () {
  var samplerList = [];
  for (var i = 0; i < NUM_SAMPLERS; i++) {
    var sampler = new Sampler(audioGraph.getAudioContext());
    //sampler.connectTo(audioGraph.dry);
    samplerList.push(sampler);
  }
  return samplerList;
}

function buildEqualizers () {
  let eqList = [];
  for (var i = 0; i < NUM_EQUALIZERS; i++) {
    var eq = new Equalizer(audioGraph.getAudioContext());
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

function scheduleNote(time) {
    //notesInQueue.push( { note: beatNumber, time: time } );
    console.log('scheduleNote ', time);
}

function loadConfigFiles () {
  Http.get('config/example.json')
    .then((resolve) => console.log(resolve.data));
}


loadConfigFiles();
loadSamples();
export default audio;
