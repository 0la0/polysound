'use strict';

function importCascadeBehavior(Matrix) {

  if (!Matrix) {
    console.warn('cannot import cascade behavior without matrix class');
  }

  function cascadeBehavior() {

    function init() {
      this.changeDirection();
    }

    function run() {
      if (++this.columnIndex >= this.matrix[this.rowIndex].length) {

        this.matrix = Matrix.rotate180(this.matrix);
        if (++this.rotateCnt % 2 !== 0) {
          this.matrix = Matrix.shiftDown(this.matrix);
          this.matrix = Matrix.shiftDown(this.matrix);
        }
        this.columnIndex = 0;
      }
      return this.matrix[this.rowIndex][this.columnIndex];
    }

    function render() {}

    function touch(activeTouchStates) {}

    function play() {}

    return {
      init: init,
      run: run,
      render: render,
      touch: touch,
      play: play
    };
  }

  return cascadeBehavior();
};