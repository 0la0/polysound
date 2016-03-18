"use strict";

function importLaunchpadHelpers() {

  var LAUNCHPAD_WIDTH = 8;
  var MIDI_CC = 11;

  function eventIsInMatrix(message, row, column) {
    return row < LAUNCHPAD_WIDTH && column < LAUNCHPAD_WIDTH;
  }

  function eventIsInTopBar(message, row, column) {
    return message.command === MIDI_CC;
  }

  function eventIsInSideBar(message, row, column) {
    return column === LAUNCHPAD_WIDTH;
  }

  return {
    eventIsInMatrix: eventIsInMatrix,
    eventIsInTopBar: eventIsInTopBar,
    eventIsInSideBar: eventIsInSideBar
  };
};