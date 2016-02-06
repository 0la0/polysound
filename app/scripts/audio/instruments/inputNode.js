import BaseInstrument from './baseInstrument.js';


export default class InputNode extends BaseInstrument {

  constructor (audioContext) {
    super (audioContext);
    this.inputSource = null;
  }

  start () {
    navigator.getUserMedia({audio: true},
      (audioStream) => {
        this.inputSource = this.audioContext.createMediaStreamSource(audioStream);
        this.inputSource.connect(this.input);
      },
      (error) => {
        console.log('Error: InputNode.getUserMedia:', error);
      }
    );
  }

  stop () {
    if (!this.inputSource) { return ; }
    this.inputSource.disconnect(this.input);
    this.inputSource = null;
  }

}


function setCrossBrowserSupport () {
  navigator.getUserMedia = ( navigator.getUserMedia ||
                     navigator.webkitGetUserMedia ||
                     navigator.mozGetUserMedia ||
                     navigator.msGetUserMedia);
}
setCrossBrowserSupport();
