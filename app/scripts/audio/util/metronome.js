//http://www.html5rocks.com/en/tutorials/audio/scheduling/
//https://github.com/cwilso/metronome/

export default class Metronome {

  constructor (audioContext, noteScheduler) {
    this.audioContext = audioContext;
    this.noteScheduler = noteScheduler;

    this.scheduleAheadTime = 0.1;
    this.nextNoteTime = 0.0;
    this.lookahead = 25.0;
    this.tempo = 120.0;
    this.isRunning = false;

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
    if (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime ) {
      this.noteScheduler.masterScheduler(this.nextNoteTime);

      var secondsPerBeat = 60.0 / this.tempo;
      this.nextNoteTime += 0.25 * secondsPerBeat;
    }
  }

  start () {
    if (!this.isRunning) {
      this.noteScheduler.start();
      this.nextNoteTime = this.audioContext.currentTime;
      this.baseTime = this.nextNoteTime;
      this.timerWorker.postMessage("start");
      this.isRunning = true;
    }
    else {
      console.warn('Cannot start a running metronome');
    }
  }

  stop () {
    this.noteScheduler.stop();
    this.timerWorker.postMessage("stop");
    this.isRunning = false;
  }

  setTempo (tempo) {
    this.tempo = tempo;
  }

  getTempo () {
    return this.tempo;
  }

}
