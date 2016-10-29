'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var MicrophoneInput = function () {
    function MicrophoneInput() {
      _classCallCheck(this, MicrophoneInput);
    }

    _createClass(MicrophoneInput, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'microphone-input';

        this.properties = {
          inputModel: {
            type: Object
          },
          connectionInput: {
            type: Object
          },
          connectionOutput: {
            type: Object
          }
        };
      }
    }, {
      key: 'ready',
      value: function ready() {}
    }, {
      key: 'attached',
      value: function attached() {
        this.inputButtonModel = buildInputButton.call(this);
        this.recordButtonModel = buildRecordButton.call(this);
        this.removable = buildRemovable.call(this);
      }
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }]);

    return MicrophoneInput;
  }();

  Polymer(MicrophoneInput);

  function buildInputButton() {
    var _this = this;

    return {
      callback: function callback(inputIsActive) {
        if (inputIsActive) {
          _this.inputModel.turnOnInput();
        } else {
          if (_this.$.recordBtn.buttonValue) {
            _this.$.recordBtn.setValue(false);
          }
          _this.inputModel.turnOffInput();
        }
      }
    };
  }

  function buildRecordButton() {
    var _this2 = this;

    return {
      callback: function callback(recordIsActive) {
        if (!_this2.$.inputBtn.buttonValue) {
          console.warn('input must be activated to record');
          return;
        }
        recordIsActive ? _this2.inputModel.startRecording() : _this2.inputModel.stopRecording();
      }
    };
  }

  function buildRemovable() {
    var _this3 = this;

    return {
      callback: function callback() {
        _this3.connectionOutput.helpers.removeElement(_this3.inputModel.getOutput());
        Polymer.dom(_this3).parentNode.removeChild(_this3);
      }
    };
  }
})();