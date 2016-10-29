'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var CustomGrainulator = function () {
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
          scheduleScatter: {
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
          voiceSpread: {
            type: Number,
            value: 0
          },
          pitch: {
            type: Number,
            value: 0,
            test: 0.5
          },
          playThreshold: {
            type: Number,
            value: 1
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

      // _grainLoop () {
      //   this.instrumentSet.forEach((instrument) => {
      //     for (let i = 0; i < this.numVoices; i++) {
      //       let position = getPosition(this.position, instrument.getDuration(), this.spread);
      //       let pitch = Math.round(this.pitch);
      //       instrument.play(pitch, 0, position);
      //     }
      //   });
      //
      //   if (this.isOn) {
      //     let timeOut = this.loopTime * 1000;
      //     setTimeout(this._grainLoop.bind(this), timeOut);
      //   }
      //
      // }

    }]);

    return CustomGrainulator;
  }();

  function getPosNeg() {
    return Math.random() < 0.5 ? -1 : 1;
  }

  function buildSchedulable() {
    var _this = this;

    return {
      processTick: function processTick(beatNumber, time) {
        var deltaTimeStep = app.audio.metronome.tempo / 60 / 16;
        var nextTimeStep = time + deltaTimeStep;
        var baseSchedule = _this.nextScheduledNote || time;

        _this.instrumentSet.forEach(function (instrument) {
          var schedule = baseSchedule;
          while (schedule < nextTimeStep) {
            var position = getPosition(_this.position, instrument.getDuration(), _this.spread);
            var pitch = Math.round(_this.pitch);

            for (var i = 0; i < _this.numVoices; i++) {
              var scatter = _this.scheduleScatter * Math.random();
              var voiceSpread = _this.voiceSpread * i;
              var playShedule = schedule + scatter + voiceSpread;
              if (Math.random() <= _this.playThreshold) {
                instrument.play(pitch, playShedule, position);
              }
            }

            schedule += _this.loopTime;
          }
          _this.nextScheduledNote = schedule;
        });
      },
      render: function render(beatNumber, lastBeatNumber) {},
      start: function start() {},
      stop: function stop() {
        _this.nextScheduledNote = 0;
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
    var _this2 = this;

    return {
      callback: function callback(isOn) {
        // this.isOn = isOn;
        // if (isOn) {
        //   this._grainLoop();
        // }
        isOn ? app.scheduler.register(_this2.schedulable) : app.scheduler.deregister(_this2.schedulable);
      }
    };
  }

  Polymer(CustomGrainulator);
})();