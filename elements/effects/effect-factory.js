'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var EffectFactory = (function () {
    function EffectFactory() {
      _classCallCheck(this, EffectFactory);
    }

    _createClass(EffectFactory, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'effect-factory';

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
          effectContainer: {
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

        this.effectContainer = Polymer.dom(this.parent).querySelector('#' + this.effectContainer);

        this.effectTable = {
          'Equalizer': 'equalizer',
          'Delay': 'delay',
          'Reverb': 'reverb',
          'Compressor': 'compressor',
          'Drone Filter': 'drone',
          'Waveshaper': 'waveshaper'
        };
        this.effectList = Object.keys(this.effectTable);

        this.callbackHandler = {
          execute: function execute(selectionString) {
            var selectionValue = _this.effectTable[selectionString];
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
        var effectElement = ElementFactory[selectionValue](this.factoryModel);
        effectElement.connectionInput = this.connectionInput;
        effectElement.connectionOutput = this.connectionOutput;
        Polymer.dom(this.effectContainer).appendChild(effectElement);
      }
    }]);

    return EffectFactory;
  })();

  Polymer(EffectFactory);

  var ElementFactory = {
    equalizer: function equalizer(effectFactory) {
      var equalizerElement = document.createElement('equalizer-three');
      equalizerElement.equalizerModel = effectFactory.createEqualizer();
      return equalizerElement;
    },
    delay: function delay(effectFactory) {
      var delayElement = document.createElement('simple-delay');
      delayElement.delayModel = effectFactory.createDelay();
      return delayElement;
    },
    reverb: function reverb(effectFactory) {
      var reverbElement = document.createElement('simple-reverb');
      reverbElement.reverbModel = effectFactory.createReverb();
      return reverbElement;
    },
    compressor: function compressor(effectFactory) {
      var compressorElement = document.createElement('simple-compressor');
      compressorElement.compressorModel = effectFactory.createCompressor();
      return compressorElement;
    },
    drone: function drone(effectFactory) {
      var droneElement = document.createElement('drone-filter');
      droneElement.filterModel = effectFactory.createDroneFilter();
      return droneElement;
    },
    waveshaper: function waveshaper(effectFactory) {
      var droneElement = document.createElement('waveshaper-element');
      droneElement.waveshaperModel = effectFactory.createWaveshaper();
      return droneElement;
    }
  };
})();