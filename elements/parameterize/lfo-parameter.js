'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var Lfo = function () {
    function Lfo() {
      _classCallCheck(this, Lfo);
    }

    _createClass(Lfo, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'lfo-parameter';

        this.properties = {
          modulatable: {
            type: Object
          },
          lowerBound: {
            type: Number,
            value: 0.1
          },
          upperBound: {
            type: Number,
            value: 10
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
        this.lfo = app.audio.effectFactory.createLfo();
        this.lfo.setModulatable(this.modulatable);

        this.multiSelect = buildMultiSelectModel.call(this);
        this.buttonModel = buildButtonModel.call(this);
      }
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }]);

    return Lfo;
  }();

  function buildMultiSelectModel() {
    var _this = this;

    return {
      list: [{
        display: 'sin',
        value: 'SINE'
      }, {
        display: 'squ',
        value: 'SQUARE'
      }, {
        display: 'saw',
        value: 'SAWTOOTH'
      }, {
        display: 'tri',
        value: 'TRIANGLE'
      }],
      callback: function callback(selectionString) {
        _this.lfo.setOscilator(selectionString);
      }
    };
  }

  function buildButtonModel() {
    var _this2 = this;

    return {
      callback: function callback(lfoIsOn) {
        lfoIsOn ? _this2.lfo.start() : _this2.lfo.stop();
      }
    };
  }

  Polymer(Lfo);
})();