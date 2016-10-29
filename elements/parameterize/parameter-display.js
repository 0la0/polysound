'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var ParameterDisplay = function () {
    function ParameterDisplay() {
      _classCallCheck(this, ParameterDisplay);
    }

    _createClass(ParameterDisplay, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'parameter-display';

        this.properties = {
          model: {
            type: Number,
            notify: true,
            observer: '_valueChanged'
          },
          modulatable: {
            type: Object
          },
          lowerBound: {
            type: Number
          },
          upperBound: {
            type: Number
          },
          label: {
            type: String
          },
          displayDirection: {
            type: String,
            value: 'row'
          }
        };
      }
    }, {
      key: 'ready',
      value: function ready() {}
    }, {
      key: 'attached',
      value: function attached() {
        if (this.displayDirection === 'column') {
          this.$.parameterDisplay.classList.add('parameter--column');
          this.$$('value-envelope').classList.add('parameter__envelope--column');
          this.$$('label').classList.add('parameter__label--column');
          this.$$('slider-bidirectional').classList.add('parameter__slider--column');
          this.$$('value-display').classList.add('parameter__value--column');
        } else {
          this.$.parameterDisplay.classList.add('parameter--row');
          this.$$('value-envelope').classList.add('parameter__envelope--row');
          this.$$('label').classList.add('parameter__label--row');
          this.$$('slider-bidirectional').classList.add('parameter__slider--row');
          this.$$('value-display').classList.add('parameter__value--row');
        }

        this.midiListener = buildMidiListener.call(this);
      }
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}

      //to bind an external application controler value

    }, {
      key: '_valueChanged',
      value: function _valueChanged(newValue) {
        // if (this.midiListener && this.midiListener.isRegistered) {
        //   this.midiListener.sendMessage(newValue);
        // }
      }
    }]);

    return ParameterDisplay;
  }();

  Polymer(ParameterDisplay);

  function buildMidiListener() {
    var _this = this;

    var _status = void 0;
    var _note = void 0;
    var _lastValue = void 0;
    var _midiListener = {
      isRegistered: false,
      setBoundMidiData: function setBoundMidiData(command, status, note, value) {
        _status = status;
        _note = note;
      },
      onMessage: function onMessage(command, status, note, value) {
        var normalValue = value / 127;
        var realValue = normalValue * (_this.upperBound - _this.lowerBound) + _this.lowerBound;
        _lastValue = realValue;
        _this.model = realValue;
      },
      sendMessage: function sendMessage(value) {
        if (value === _lastValue) {
          return;
        }
        var realValue = Math.floor(value * 127);
        var wsMessage = {
          type: 'MESSAGE',
          command: 0,
          status: _status,
          note: _note,
          value: realValue
        };
        app.audio.webSocketClient.send(JSON.stringify(wsMessage));
      }
    };
    return _midiListener;
  }
})();