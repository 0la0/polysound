'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var Waveshaper = function () {
    function Waveshaper() {
      _classCallCheck(this, Waveshaper);
    }

    _createClass(Waveshaper, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'waveshaper-element';

        this.properties = {
          waveshaperModel: {
            type: Object
          },
          connectionInput: {
            type: Object
          },
          connectionOutput: {
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
        this.multiSelectModel = buildMultiSelectModel.call(this, this.waveshaperModel);
        this.removable = importRemovable.call(this, this.waveshaperModel);
      }
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }]);

    return Waveshaper;
  }();

  Polymer(Waveshaper);

  function buildMultiSelectModel(waveshaperModel) {
    var _this = this;

    return {
      list: waveshaperModel.getCarrierFunctions().map(function (waveFunction) {
        return {
          display: waveFunction,
          value: waveFunction
        };
      }),
      callback: function callback(selectionString) {
        _this.waveshaperModel.setCarrierFunction(selectionString);
      }
    };
  }
})();