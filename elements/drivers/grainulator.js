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
            value: 0.5
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

  Polymer(CustomGrainulator);

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
        _this2.isOn = isOn;
        if (isOn) {
          _this2._grainLoop();
        }
      }
    };
  }
})();