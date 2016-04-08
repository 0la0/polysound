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
          baseFrequency0: {
            type: Number,
            value: 0,
            notify: true,
            observer: '_onBaseFrequencyChange0'
          },
          baseFrequency1: {
            type: Number,
            value: 0,
            notify: true,
            observer: '_onBaseFrequencyChange1'
          },
          baseFrequency2: {
            type: Number,
            value: 0,
            notify: true,
            observer: '_onBaseFrequencyChange2'
          },
          gain0: {
            type: Number,
            value: 0.5,
            notify: true,
            observer: '_onGainChange0'
          },
          gain1: {
            type: Number,
            value: 0.5,
            notify: true,
            observer: '_onGainChange1'
          },
          gain2: {
            type: Number,
            value: 0.5,
            notify: true,
            observer: '_onGainChange2'
          },
          masterFrequency: {
            type: Number,
            value: 69,
            notify: true,
            observer: '_onMasterFrequencyChange'
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
        this.synthSelect_0 = buildMultiSelectModel(0, this.synthModel);
        this.synthSelect_1 = buildMultiSelectModel(1, this.synthModel);
        this.synthSelect_2 = buildMultiSelectModel(2, this.synthModel);

        this.synth0 = this.synthModel.synthList[0];
        this.synth1 = this.synthModel.synthList[1];
        this.synth2 = this.synthModel.synthList[2];

        this.removable = importRemovable.call(this, this.synthModel);
        this.mtof = importMtof();
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
      key: '_onBaseFrequencyChange0',
      value: function _onBaseFrequencyChange0(newValue) {
        this._setBaseFrequency(0, newValue);
      }
    }, {
      key: '_onBaseFrequencyChange1',
      value: function _onBaseFrequencyChange1(newValue) {
        this._setBaseFrequency(1, newValue);
      }
    }, {
      key: '_onBaseFrequencyChange2',
      value: function _onBaseFrequencyChange2(newValue) {
        this._setBaseFrequency(2, newValue);
      }
    }, {
      key: '_setBaseFrequency',
      value: function _setBaseFrequency(index, newValue) {
        if (this.synthModel) {
          var midiNote = this.masterFrequency + Math.round(newValue);
          var frequency = this.mtof.getFrequency(midiNote);
          this.synthModel.synthList[index].synth.setBaseFrequency(frequency);
        }
      }
    }, {
      key: '_onGainChange0',
      value: function _onGainChange0(newValue) {
        this._setGain(0, newValue);
      }
    }, {
      key: '_onGainChange1',
      value: function _onGainChange1(newValue) {
        this._setGain(1, newValue);
      }
    }, {
      key: '_onGainChange2',
      value: function _onGainChange2(newValue) {
        this._setGain(2, newValue);
      }
    }, {
      key: '_setGain',
      value: function _setGain(index, newValue) {
        if (this.synthModel) {
          this.synthModel.synthList[index].gain.gain.value = newValue;
        }
      }
    }, {
      key: '_onMasterFrequencyChange',
      value: function _onMasterFrequencyChange(newValue) {
        if (this.mtof) {
          this._setBaseFrequency(0, this.baseFrequency0);
          this._setBaseFrequency(1, this.baseFrequency1);
          this._setBaseFrequency(2, this.baseFrequency2);
        }
      }
    }]);

    return SimpleSynth;
  })();

  Polymer(SimpleSynth);

  function buildMultiSelectModel(synthIndex, synthModel) {
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
        synthModel.setOscilator(synthIndex, selectionString);
      }
    };
  }

  function buildButtonModel() {
    var _this = this;

    return {
      callback: function callback(synthIsOn) {
        synthIsOn ? _this.synthModel.start() : _this.synthModel.stop();
      }
    };
  }
})();