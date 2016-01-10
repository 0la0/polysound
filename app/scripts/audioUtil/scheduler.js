
export default class Scheduler {

  constructor () {
    this.registry = new Set();
    this.beatNumber = 0;
  }

  _incrementBeat (beatNumber) {
    beatNumber += 1;
    if (beatNumber % 16 === 0) {
      beatNumber = 0;
    }
    return beatNumber;
  }

  masterScheduler (time) {
    this.registry.forEach(schedulableFunction => schedulableFunction(this.beatNumber, time));
    this.beatNumber = this._incrementBeat(this.beatNumber);
  }

  register (schedulableFunction) {
    this.registry.add(schedulableFunction);
  }

  deregister (schedulableFunction) {
    this.registry.delete(schedulableFunction);
  }

}
