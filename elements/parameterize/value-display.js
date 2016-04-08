'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var ValueDisplay = (function () {
    function ValueDisplay() {
      _classCallCheck(this, ValueDisplay);
    }

    _createClass(ValueDisplay, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'value-display';

        this.properties = {
          model: {
            type: Number,
            notify: true
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

        this.$.numberInput.addEventListener('focus', function (event) {
          var valueLength = (_this.$.numberInput.value + '').length;
          _this.$.numberInput.setSelectionRange(2, valueLength);
        }, true);

        this.$.numberInput.addEventListener('blur', function (event) {
          //let clampedValue = Math.max(0, Math.min(this.$.numberInput.value, 1));
          _this.model = parseFloat(_this.$.numberInput.value);
        }, true);
      }
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }]);

    return ValueDisplay;
  })();

  Polymer(ValueDisplay);
})();