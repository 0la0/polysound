'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var ApcSequencer = function () {
    function ApcSequencer() {
      _classCallCheck(this, ApcSequencer);
    }

    _createClass(ApcSequencer, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'apc-sequencer';

        this.properties = {
          instrumentList: {
            type: Array
          },
          removable: {
            type: Object
          }
        };

        this.listeners = {};
      }
    }, {
      key: 'ready',
      value: function ready() {}
    }, {
      key: 'attached',
      value: function attached() {
        var _this = this;

        this.width = 8;
        this.isReset = true;
        this.schedulable = buildSchedulable.call(this);
        app.scheduler.register(this.schedulable);

        var matrixNodeList = this.getElementsByClassName('matrix');
        this.matrixList = Array.prototype.slice.call(matrixNodeList);
        this.activeIndex;

        this.apcDevice = buildMidiDevice.call(this, app.audio.midiDeviceFactory, this.matrixList);

        this.clipManager = buildClipManager(this.matrixList, this.apcDevice, function (activeIndex) {
          _this.activeIndex = activeIndex;
          _this.isReset = true;
        });

        setTimeout(function () {
          _this.matrixList[0].setAsActive();
        }, 0);
      }
    }, {
      key: 'detached',
      value: function detached() {
        app.scheduler.deregister(this.schedulable);
      }
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }]);

    return ApcSequencer;
  }();

  Polymer(ApcSequencer);

  function buildMidiDevice(midiDeviceFactory, matrixList) {
    var _this2 = this;

    this.apcDevice = midiDeviceFactory.getDeviceByName('Akai APC20');

    if (!this.apcDevice.input && !this.apcDevice.output) {
      this.apcDevice.input = {};
      this.apcDevice.output = {};
      console.warn('APC not connected');
    }

    function renderColumn(outputDevice, index, columnData) {
      for (var i = 0; i < 5; i++) {
        if (columnData[i]) {
          continue;
        }
        var note = i + 53;
        var messageObjectOn = { command: StatusMap.NOTE_ON, status: index, note: note, value: 127 };
        outputDevice.send(getMessageFromObject(messageObjectOn));
      }
    }

    function clearColumn(outputDevice, index, columnData) {
      for (var i = 0; i < 5; i++) {
        if (columnData[i]) {
          continue;
        }
        var note = i + 53;
        var messageObjectOff = { command: StatusMap.NOTE_OFF, status: index, note: note, value: 127 };
        outputDevice.send(getMessageFromObject(messageObjectOff));
      }
    }

    function processMatrixNote(message, activeMatrix, apcDevice) {
      var row = message.note - 53;
      var column = message.status;
      if (row >= 0 && row <= 4 && message.command === StatusMap.NOTE_OFF) {
        var columnData = activeMatrix.getColumnValueList(column);
        var messageObject = {
          status: column,
          note: row + 53
        };
        if (columnData[row]) {
          messageObject.command = StatusMap.NOTE_OFF;
          messageObject.value = 127;
          activeMatrix.setValue(row, column, false);
        } else {
          messageObject.command = StatusMap.NOTE_ON;
          messageObject.value = 3;
          activeMatrix.setValue(row, column, true);
        }
        apcDevice.output.send(getMessageFromObject(messageObject));
      }
    }

    this.apcDevice.input.onmidimessage = function (event) {
      var message = getObjectFromMessage(event.data);
      processMatrixNote(message, _this2.matrixList[_this2.activeIndex], _this2.apcDevice);
    };

    this.renderApc = function (beatNumber, lastBeatNumber, isReset) {
      var messageObjectOn = { command: StatusMap.NOTE_ON, status: beatNumber, note: 52, value: 127 };
      var messageObjectOff = { command: StatusMap.NOTE_OFF, status: lastBeatNumber, note: 52, value: 127 };
      var messageOn = getMessageFromObject(messageObjectOn);
      var messageOff = getMessageFromObject(messageObjectOff);
      _this2.apcDevice.output.send(messageOn);
      _this2.apcDevice.output.send(messageOff, performance.now() + 250.0);
      renderColumn(_this2.apcDevice.output, beatNumber, _this2.matrixList[_this2.activeIndex].getColumnValueList(beatNumber));
      clearColumn(_this2.apcDevice.output, lastBeatNumber, _this2.matrixList[_this2.activeIndex].getColumnValueList(lastBeatNumber));
    };

    return this.apcDevice;
  }

  function buildSchedulable() {
    var _this3 = this;

    return {
      processTick: function processTick(beatNumber, time) {
        if (Object.keys(_this3.apcDevice.output).length === 0) {
          return;
        }
        beatNumber = beatNumber % _this3.width;

        var columnData = _this3.matrixList[_this3.activeIndex].getColumnValueList(beatNumber);
        columnData.forEach(function (matrixElement, index) {
          if (matrixElement) {
            _this3.instrumentList[index].forEach(function (instrument) {
              instrument.play(0, time);
            });
          }
        });
      },
      render: function render(beatNumber, lastBeatNumber) {
        if (Object.keys(_this3.apcDevice.output).length === 0) {
          return;
        }
        beatNumber = beatNumber % _this3.width;
        lastBeatNumber = lastBeatNumber % _this3.width;

        _this3.matrixList[_this3.activeIndex].render(beatNumber, lastBeatNumber, _this3.isReset);
        _this3.renderApc(beatNumber, lastBeatNumber, _this3.isReset);
        if (_this3.isReset) {
          _this3.isReset = false;
        }
      },
      start: function start() {
        _this3.isReset = true;
      },
      stop: function stop() {
        _this3.matrixList[_this3.activeIndex].stop();
      }
    };
  }

  function buildClipManager(matrixList, midiDevice, setActiveIndex) {
    return {
      queueActive: function queueActive(matrixElement) {
        var activeIndex = matrixList.indexOf(matrixElement);
        setActiveIndex(activeIndex);
        matrixList.forEach(function (matrix, index) {
          if (index !== activeIndex) {
            matrix.setAsInactive();
            matrix.stop();
          }
        });
      },
      onMatrixChange: function onMatrixChange(matrixElement, row, column, value) {

        var messageObject = {
          status: column,
          note: row + 53
        };

        if (value) {
          messageObject.command = StatusMap.NOTE_ON;
          messageObject.value = 3;
        } else {
          messageObject.command = StatusMap.NOTE_OFF;
          messageObject.value = 127;
        }

        var midiMessage = getMessageFromObject(messageObject);
        midiDevice.output.send(midiMessage);
      }
    };
  }
})();