'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var SimpleSynth = (function () {
    function SimpleSynth() {
      _classCallCheck(this, SimpleSynth);
    }

    _createClass(SimpleSynth, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'simple-synth';

        this.properties = {
          synthModel: {
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
            value: 440,
            notify: true,
            observer: '_onBaseFrequencyChange'
          }
        };

        this.listeners = {
          down: '_handleClick'
        };
      }
    }, {
      key: 'ready',
      value: function ready() {}
    }, {
      key: 'attached',
      value: function attached() {
        this.buttonModel = buildButtonModel.call(this);
        this.multiSelectModel = buildMultiSelectModel.call(this);
        this.removable = importRemovable.call(this, this.synthModel);
      }
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }, {
      key: '_handleClick',
      value: function _handleClick(event) {
        if (event.target === this.$.triggerButton) {
          this.synthIsOn = !this.synthIsOn;
          this._trigger(this.synthIsOn);
        }
      }
    }, {
      key: '_onBaseFrequencyChange',
      value: function _onBaseFrequencyChange(newValue) {
        if (this.synthModel) {
          this.synthModel.setBaseFrequency(newValue);
        }
      }
    }]);

    return SimpleSynth;
  })();

  Polymer(SimpleSynth);

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
        _this.synthModel.setOscilator(selectionString);
      }
    };
  }

  function buildButtonModel() {
    var _this2 = this;

    return {
      callback: function callback(synthIsOn) {
        synthIsOn ? _this2.synthModel.start() : _this2.synthModel.stop();
      }
    };
  }
})();