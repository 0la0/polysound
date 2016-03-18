'use strict';

function buildMidiHelpers() {

  var StatusMap = {
    NOTE_ON: 9,
    NOTE_OFF: 8
  };

  function getObjectFromMessage(midiMessage) {
    var command = (midiMessage[0] & '0xF0') >>> 4;
    var status = midiMessage[0] & '0xF';

    return {
      command: command,
      status: status,
      note: midiMessage[1],
      value: midiMessage[2]
    };
  }

  function getMessageFromObject(messageObject) {
    return new Uint8Array([messageObject.command << 4 | messageObject.status, messageObject.note, messageObject.value]);
  }

  return {
    StatusMap: StatusMap,
    getObjectFromMessage: getObjectFromMessage,
    getMessageFromObject: getMessageFromObject
  };
};