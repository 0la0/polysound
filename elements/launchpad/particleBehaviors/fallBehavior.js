"use strict";

function importFallBehavior() {

  function fallBehavior() {

    function init(targetRowIndex) {
      this.targetRowIndex = targetRowIndex || 0;
    }

    function run() {
      if (++this.rowIndex >= this.matrix.length) {
        this.rowIndex = this.targetRowIndex || 0;
      }
      return this.matrix[this.rowIndex][this.columnIndex];
    }

    function render() {
      //TODO: return a list of value to render, i.e. move current / last management here
    }

    function touch(activeTouchStates) {
      if (activeTouchStates.length) {
        this.targetRowIndex = activeTouchStates[0].row;
      }
    }

    function play() {
      return this.rowIndex === this.matrix.length - 1;
    }

    return {
      init: init,
      run: run,
      render: render,
      touch: touch,
      play: play
    };
  }

  return fallBehavior();
};