/**
 * Recording from an input to a new buffer:
 * http://typedarray.org/from-microphone-to-wav-with-getusermedia-and-web-audio/
 * https://github.com/mattdiamond/Recorderjs
 **/

import BaseInstrument from './baseInstrument.js';


export default class InputNode extends BaseInstrument {

  constructor (audioContext) {
    super (audioContext);
    this.inputSource = null;
    this.recordingScriptNode = null;
  }

  turnOnInput () {
    navigator.getUserMedia({audio: true},
      (audioStream) => {
        this.inputSource = this.audioContext.createMediaStreamSource(audioStream);
        this.inputSource.connect(this.output);
      },
      (error) => {
        console.log('Error: InputNode.getUserMedia:', error);
      }
    );
  }

  turnOffInput () {
    if (!this.inputSource) { return ; }
    this.inputSource.disconnect(this.output);
    this.inputSource = null;
  }

  resetRecordingData () {
    this.recordingData = {
      sampleRate: this.audioContext.sampleRate,
      bufferSize: Math.pow(2, 11),
      length: 0,
      leftChannel: [],
      rightChannel: []
    }
  }

  startRecording () {
    this.resetRecordingData();
    //ScriptProcessor is deprecated, and will be replaced by Audio Workers
    this.recordingScriptNode = this.audioContext.createScriptProcessor(this.recordingData.bufferSize, 2, 2);

    this.recordingScriptNode.onaudioprocess = (event) => {
      this.recordingData.leftChannel.push(
        new Float32Array(event.inputBuffer.getChannelData(0)));
      this.recordingData.rightChannel.push(
        new Float32Array(event.inputBuffer.getChannelData(1)));
      this.recordingData.length += this.recordingData.bufferSize;
    }

    this.inputSource.connect(this.recordingScriptNode);
    this.recordingScriptNode.connect(this.audioContext.destination); //TODO: create a different node for this
  }

  stopRecording () {
    this.inputSource.disconnect(this.recordingScriptNode);
    this.recordingScriptNode.disconnect(this.audioContext.destination);
    this.recordingScriptNode = null;

    let leftChannelData = createChannelBuffer(this.recordingData.length, this.recordingData.leftChannel);
    let rightChannelData = createChannelBuffer(this.recordingData.length, this.recordingData.rightChannel);
    let audioBuffer = this.audioContext.createBuffer(2, this.recordingData.length, this.recordingData.sampleRate);
    audioBuffer.getChannelData(0).set(leftChannelData);
    audioBuffer.getChannelData(1).set(rightChannelData);

    let sampleKey = new Date().getTime() + '';
    app.audio.sampleMap.set(sampleKey, audioBuffer);
  }

}

function createChannelBuffer (recordingLength, channelSourceArray) {
  let totalChannelData = new Float32Array(recordingLength);

  channelSourceArray.reduce((offset, sampleFrameArray) => {
    totalChannelData.set(sampleFrameArray, offset);
    return offset + sampleFrameArray.length;
  }, 0);
  return totalChannelData;
}


function setCrossBrowserSupport () {
  navigator.getUserMedia = ( navigator.getUserMedia ||
                     navigator.webkitGetUserMedia ||
                     navigator.mozGetUserMedia ||
                     navigator.msGetUserMedia);
}
setCrossBrowserSupport();
