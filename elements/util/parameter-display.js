'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var ParameterDisplay = (function () {
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
            notify: true
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
      }
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }]);

    return ParameterDisplay;
  })();

  Polymer(ParameterDisplay);
})();