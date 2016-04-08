'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var CustomGrainulator = (function () {
    function CustomGrainulator() {
      _classCallCheck(this, CustomGrainulator);
    }

    _createClass(CustomGrainulator, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'custom-grainulator';

        this.properties = {
          instrumentSet: {
            type: Object
          },
          removable: {
            type: Object
          },
          position: {
            type: Number,
            value: 0.1
          },
          spread: {
            type: Number,
            value: 0
          },
          loopTime: {
            type: Number,
            value: 0.2
          },
          numVoices: {
            type: Number,
            value: 1
          },
          pitch: {
            type: Number,
            value: 0,
            test: 0.5
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
        this.isOn = false;
        this.buttonModel = buildButtonModel.call(this);
        this.schedulable = buildSchedulable.call(this);
        this.nextScheduledNote = 0;
      }
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }, {
      key: '_grainLoop',
      value: function _grainLoop() {
        var _this = this;

        this.instrumentSet.forEach(function (instrument) {
          for (var i = 0; i < _this.numVoices; i++) {
            var position = getPosition(_this.position, instrument.getDuration(), _this.spread);
            var pitch = Math.round(_this.pitch);
            instrument.play(pitch, 0, position);
          }
        });

        if (this.isOn) {
          var timeOut = this.loopTime * 1000;
          setTimeout(this._grainLoop.bind(this), timeOut);
        }
      }
    }]);

    return CustomGrainulator;
  })();

  function buildSchedulable() {
    var _this2 = this;

    return {
      processTick: function processTick(beatNumber, time) {

        var deltaTimeStep = app.audio.metronome.tempo / 60 / 16;
        var nextTimeStep = time + deltaTimeStep;
        var baseSchedule = _this2.nextScheduledNote || time;

        _this2.instrumentSet.forEach(function (instrument) {
          var schedule = baseSchedule;
          while (schedule < nextTimeStep) {
            var position = getPosition(_this2.position, instrument.getDuration(), _this2.spread);
            var pitch = Math.round(_this2.pitch);

            for (var i = 0; i < _this2.numVoices; i++) {
              var voiceSchedule = schedule + i * 0.001 * Math.random();
              instrument.play(pitch, voiceSchedule, position);
            }

            schedule += _this2.loopTime;
          }
          _this2.nextScheduledNote = schedule;
        });
      },
      render: function render(beatNumber, lastBeatNumber) {},
      start: function start() {},
      stop: function stop() {
        _this2.nextScheduledNote = 0;
      }
    };
  }

  function getPosition(normalPosition, duration, spreadUpperBound) {
    var spread = getPosNeg() * spreadUpperBound * Math.random();
    var position = normalPosition * duration + spread;
    return Math.max(0, Math.min(position, duration));
  }

  function getPosNeg() {
    return Math.random() < 0.5 ? -1 : 1;
  }

  function buildButtonModel() {
    var _this3 = this;

    return {
      callback: function callback(isOn) {
        // this.isOn = isOn;
        // if (isOn) {
        //   this._grainLoop();
        // }
        isOn ? app.scheduler.register(_this3.schedulable) : app.scheduler.deregister(_this3.schedulable);
      }
    };
  }

  Polymer(CustomGrainulator);
})();