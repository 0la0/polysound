'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var CloseButton = function () {
    function CloseButton() {
      _classCallCheck(this, CloseButton);
    }

    _createClass(CloseButton, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'close-button';

        this.properties = {
          equalizerModel: {
            type: Object
          },
          removable: {
            type: Object
          }
        };

        this.listeners = {
          tap: '_onTap'
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
      key: '_onTap',
      value: function _onTap(event) {
        this.removable.callback();
      }
    }]);

    return CloseButton;
  }();

  Polymer(CloseButton);
})();