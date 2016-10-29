'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var Button = function () {
    function Button() {
      _classCallCheck(this, Button);
    }

    _createClass(Button, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'simple-button';

        this.properties = {
          buttonValue: {
            type: Boolean,
            value: false
          },
          buttonModel: {
            type: Object
          },
          isTrigger: {
            type: Boolean,
            value: false
          },
          defaultText: {
            type: String
          },
          activeText: {
            type: String
          }
        };

        this.listeners = {
          down: '_onDown'
        };
      }
    }, {
      key: 'ready',
      value: function ready() {}
    }, {
      key: 'attached',
      value: function attached() {
        var _this = this;

        setTimeout(function () {
          _this._updateText();
        }, 0);
      }
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }, {
      key: 'setValue',
      value: function setValue(value) {
        if (value) {
          this._turnOn();
        } else {
          this._turnOff();
        }
      }
    }, {
      key: '_onDown',
      value: function _onDown() {
        this.buttonValue = !this.buttonValue;
        if (this.buttonValue) {
          Polymer.dom(this.$.btn).classList.add('button--active');

          if (this.isTrigger) {
            setTimeout(this._turnOff.bind(this), 50);
          }
        } else {
          Polymer.dom(this.$.btn).classList.remove('button--active');
        }

        this.buttonModel.callback(this.buttonValue);
        this._updateText();
      }
    }, {
      key: '_turnOn',
      value: function _turnOn() {
        this.buttonValue = true;
        Polymer.dom(this.$.btn).classList.add('button--active');
        this.buttonModel.callback(this.buttonValue);
        this._updateText();
      }
    }, {
      key: '_turnOff',
      value: function _turnOff() {
        this.buttonValue = false;
        Polymer.dom(this.$.btn).classList.remove('button--active');
        this.buttonModel.callback(this.buttonValue);
        this._updateText();
      }
    }, {
      key: '_updateText',
      value: function _updateText() {
        if (this.buttonValue && this.activeText) {
          this.$.btn.innerText = this.activeText;
        } else if (!this.buttonValue && this.defaultText) {
          this.$.btn.innerText = this.defaultText;
        }
      }
    }]);

    return Button;
  }();

  Polymer(Button);
})();