'use strict';

function importRotateBehavior(Matrix) {

  if (!Matrix) {
    console.warn('cannot import rotate behavior without matrix class');
  }

  function rotateBehavior() {

    function init() {}

    function run() {
      if (++this.columnIndex >= this.matrix[this.rowIndex].length) {
        this.matrix = Matrix.rotateCounterClockwise(this.matrix);
        this.columnIndex = 1;
        //a second check covers the case of a one dimensional matrix
        if (this.columnIndex >= this.matrix[this.rowIndex].length) {
          this.matrix = Matrix.rotateCounterClockwise(this.matrix);
          this.columnIndex = 1;
        }
      }
      return this.matrix[this.rowIndex][this.columnIndex];
    }

    function render() {}

    function touch(activeTouchStates) {
      if (activeTouchStates.length > 1) {
        var lowerBound = activeTouchStates[0];
        var upperBound = activeTouchStates[1];

        var newWidth = Math.abs(upperBound.column - lowerBound.column);
        var newHeight = Math.abs(upperBound.row - lowerBound.row);
        var newX = Math.min(lowerBound.column, upperBound.column);
        var newY = Math.min(lowerBound.row, upperBound.row);

        this.setMatrix(newX, newY, newWidth + 1, newHeight + 1);
      }
    }

    function play() {}

    return {
      init: init,
      run: run,
      render: render,
      touch: touch,
      play: play
    };
  }

  return rotateBehavior();
};