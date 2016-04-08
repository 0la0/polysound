'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var CodeSequencer = (function () {
    function CodeSequencer() {
      _classCallCheck(this, CodeSequencer);
    }

    _createClass(CodeSequencer, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'code-sequencer';

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
        this.isReset = true;
        this.schedulable = buildSchedulable.call(this);
        app.scheduler.register(this.schedulable);
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

    return CodeSequencer;
  })();

  function buildSchedulable() {
    var _this = this;

    return {
      processTick: function processTick(beatNumber, time) {
        var i = beatNumber;
        var inputString = _this.$.inputTextArea.value;
        var deltaTimeStep = app.audio.metronome.tempo / 60 / 16;

        _this.instrumentSet.forEach(function (instrument) {
          var play = instrument.play.bind(instrument);
          try {
            eval(inputString);
          } catch (error) {
            console.warn(error);
          }
        });
      },
      render: function render(beatNumber, lastBeatNumber) {},
      start: function start() {},
      stop: function stop() {}
    };
  }

  Polymer(CodeSequencer);
})();