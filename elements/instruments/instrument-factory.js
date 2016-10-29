'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var InstrumentFactory = function () {
    function InstrumentFactory() {
      _classCallCheck(this, InstrumentFactory);
    }

    _createClass(InstrumentFactory, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'instrument-factory';

        this.properties = {
          factoryModel: {
            type: Object
          },
          connectionInput: {
            type: Object
          },
          connectionOutput: {
            type: Object
          },
          instrumentContainer: {
            type: String
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

        this.instrumentContainer = Polymer.dom(this.parent).querySelector('#' + this.instrumentContainer);

        this.instrumentTable = {
          'Sampler': 'sampler',
          'Synth': 'synth',
          'White Noise': 'noise',
          'Input': 'input'
        };
        this.instrumentList = Object.keys(this.instrumentTable);

        this.callbackHandler = {
          execute: function execute(selectionString) {
            var selectionValue = _this.instrumentTable[selectionString];
            if (selectionValue) {
              _this._buildElement(selectionValue);
            }
          }
        };
      }
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }, {
      key: '_buildElement',
      value: function _buildElement(selectionValue) {
        var instrumentElement = ElementFactory[selectionValue](this.factoryModel);
        instrumentElement.connectionInput = this.connectionInput;
        instrumentElement.connectionOutput = this.connectionOutput;
        Polymer.dom(this.instrumentContainer).appendChild(instrumentElement);
      }
    }]);

    return InstrumentFactory;
  }();

  Polymer(InstrumentFactory);

  var ElementFactory = {
    sampler: function sampler(instrumentFactory) {
      var samplerElement = document.createElement('simple-sampler');
      samplerElement.samplerModel = instrumentFactory.createSampler();
      return samplerElement;
    },
    synth: function synth(instrumentFactory) {
      var synthElement = document.createElement('simple-synth');
      synthElement.synthModel = instrumentFactory.createSynth();
      return synthElement;
    },
    input: function input(instrumentFactory) {
      var inputElement = document.createElement('microphone-input');
      inputElement.inputModel = instrumentFactory.createInputNode();
      return inputElement;
    },
    noise: function noise(instrumentFactory) {
      var noiseElement = document.createElement('white-noise');
      noiseElement.noiseModel = instrumentFactory.createWhiteNoiseNode();
      return noiseElement;
    }
  };
})();