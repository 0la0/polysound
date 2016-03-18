'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var SimpleAdsr = (function () {
    function SimpleAdsr() {
      _classCallCheck(this, SimpleAdsr);
    }

    _createClass(SimpleAdsr, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'simple-adsr';

        this.properties = {
          adsrModel: {
            type: Object,
            value: {
              attack: 0.1,
              decay: 0.1,
              sustain: 0.1,
              release: 0.1
            }
          }
        };
      }
    }, {
      key: 'ready',
      value: function ready() {}
    }, {
      key: 'attached',
      value: function attached() {}
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }, {
      key: 'behaviors',
      get: function get() {
        return [];
      }
    }]);

    return SimpleAdsr;
  })();

  Polymer(SimpleAdsr);
})();