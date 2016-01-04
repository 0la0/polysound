import AudioGraph from './audioUtil/audioGraph.js';
import Metronome from './audioUtil/metronome.js';
import Sampler from './audioUtil/sampler.js';
import Equalizer from './audioUtil/equalizer.js';
import Delay from './audioUtil/delay.js';
import Http from './util/http.js';



const NUM_SAMPLERS = 2;
const NUM_EQUALIZERS = 3;

var audioGraph = new AudioGraph();
var metronome = new Metronome(audioGraph.getAudioContext(), scheduleNote);
var samples = [];

var samplerList = buildSamplers();
var equalizerList = buildEqualizers();

var audio = {
  audioGraph: audioGraph,
  metronome: metronome,
  samplerList: samplerList,
  equalizerList: equalizerList,
  sends: {
    delay: new Delay(audioGraph.getAudioContext(), audioGraph.wet)
  }
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
    eq.connectTo(audioGraph.dry);
    eqList.push(eq);
  }
  return eqList;
}

function loadSamples () {
  var audioContext = audioGraph.getAudioContext();
  var filePaths = [
    'audioSamples/snare_loFi_bright.wav',
    'audioSamples/woodClog55.wav'
  ];

  filePaths.forEach((path, index) => {
    Http.getAudioSample(path, audioContext)
      .then((response) => {
        samples.push(response.data);
        audio.samplerList[index].setSample(response.data);
      });
  });


  // Http.getAudioSample(path, audioContext)
  //   .then((response) => {
  //     samples.push(response.data);
  //     audio.samplerList[0].setSample(response.data);
  //   });
}

function scheduleNote(time) {
    //notesInQueue.push( { note: beatNumber, time: time } );
    console.log('scheduleNote ', time);
}

// function testConnect () {
//   var sampler = audio.samplerList[0];
//   var equalizer = audio.equalizerList[0];
//   sampler.connectTo(equalizer.lo);
// }

//testConnect();
loadSamples();
export default audio;
