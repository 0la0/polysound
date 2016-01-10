
export default class Scheduler {

  constructor (audioContext) {
    this.audioContext = audioContext;
    this.registry = new Set();
    this.beatNumber = 0;
    this.noteToRender = 0;
    this.lastNoteDrawn = 0;
    this.isRunning = false;
    this.nextScheduledTime = Number.MAX_VALUE;
  }

  masterScheduler (time) {
    this.nextScheduledTime = time;
    this.registry.forEach(schedulable => schedulable.processTick(this.beatNumber, time));
    this.noteToRender = this.beatNumber;
    this.beatNumber = incrementBeat(this.beatNumber);
  }

  register (schedulable) {
    this.registry.add(schedulable);
  }

  deregister (schedulable) {
    this.registry.delete(schedulable);
  }

  start () {
    this.isRunning = true;
    this.registry.forEach(schedulable => schedulable.start());
    this._draw();
  }

  stop () {
    this.isRunning = false;

  }

  _draw () {
    if (this.nextScheduledTime >= this.audioContext.currentTime) {
      this.registry.forEach(schedulable => schedulable.render(this.noteToRender, this.lastNoteDrawn));
      this.lastNoteDrawn = this.noteToRender;
    }

    if (this.isRunning) {
      requestAnimationFrame(this._draw.bind(this));
    }
    else {
      this.beatNumber = 0;
      this.lastBeatNumber = 0;
      this.noteToRender = 0;
      this.nextScheduledTime = Number.MAX_VALUE;
      this.registry.forEach(schedulable => schedulable.stop());
    }
  }

}

function incrementBeat (beatNumber) {
  beatNumber += 1;
  if (beatNumber % 16 === 0) {
    beatNumber = 0;
  }
  return beatNumber;
}
