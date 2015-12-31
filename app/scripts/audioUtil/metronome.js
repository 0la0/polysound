

export default class Metronome {

  constructor (audioContext, noteScheduler) {
    this.audioContext = audioContext;
    this.noteScheduler = noteScheduler;

    this.scheduleAheadTime = 0.1;
    this.nextNoteTime = 0.0;
    this.lookahead = 25.0;
    this.tempo = 120.0;

    //TODO: change worker to es6 template
    this.timerWorker = new Worker("scripts/workers/metronomeworker.js");

    this.timerWorker.onmessage = (event) => {
      if (event.data === 'tick') {
        this.scheduler();
      }
      else {
        //console.log('timerWorker message:', event.data);
      }
    };
    this.timerWorker.postMessage({"interval":this.lookahead});
  }

  scheduler () {
      //change
    while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime ) {
        this.noteScheduler(this.nextNoteTime);

        var secondsPerBeat = 60.0 / this.tempo;
        this.nextNoteTime += 0.25 * secondsPerBeat;
    }
  }

  start () {
    //change
    this.nextNoteTime = this.audioContext.currentTime;
    this.timerWorker.postMessage("start");
  }

  stop () {
    this.timerWorker.postMessage("stop");
  }

  setTempo (tempo) {
    this.tempo = tempo;
  }

  getTempo () {
    return this.tempo;
  }

}
