'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var Header = function () {
    function Header() {
      _classCallCheck(this, Header);
    }

    _createClass(Header, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'element-header';

        this.properties = {
          label: {
            type: String
          },
          removable: {
            type: Object
          }
        };

        this.listeners = {};
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
      key: 'removeCloseButton',
      value: function removeCloseButton() {
        Polymer.dom(this.$$('header')).removeChild(this.$$('close-button'));
      }
    }]);

    return Header;
  }();

  Polymer(Header);
})();