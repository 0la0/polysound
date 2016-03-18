'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var WhiteNoise = (function () {
    function WhiteNoise() {
      _classCallCheck(this, WhiteNoise);
    }

    _createClass(WhiteNoise, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'white-noise';

        this.properties = {
          noiseModel: {
            type: Object
          },
          connectionInput: {
            type: Object
          },
          connectionOutput: {
            type: Object
          },
          baseFrequency: {
            type: Number,
            value: 0,
            notify: true,
            observer: '_onBaseFrequencyChange'
          }
        };
      }
    }, {
      key: 'ready',
      value: function ready() {}
    }, {
      key: 'attached',
      value: function attached() {
        var _this = this;

        this.synthIsOn = false;
        this.buttonModel = buildButtonModel.call(this);
        this.removable = importRemovable.call(this, this.noiseModel);
        setTimeout(function () {
          _this.$$('sample-visualizer').render();
        }, 0);
      }
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }, {
      key: '_onBaseFrequencyChange',
      value: function _onBaseFrequencyChange(newValue) {
        if (this.noiseModel) {
          this.noiseModel.setDetuneValue(newValue);
        }
      }
    }]);

    return WhiteNoise;
  })();

  Polymer(WhiteNoise);

  function buildButtonModel() {
    var _this2 = this;

    return {
      callback: function callback(synthIsOn) {
        synthIsOn ? _this2.noiseModel.start() : _this2.noiseModel.stop();
      }
    };
  }
})();