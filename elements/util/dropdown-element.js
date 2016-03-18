'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var DropdownElement = (function () {
    function DropdownElement() {
      _classCallCheck(this, DropdownElement);
    }

    _createClass(DropdownElement, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'dropdown-element';

        this.properties = {
          listData: {
            type: Array
          },
          callbackHandler: {
            type: Object
          },
          label: {
            type: String,
            value: 'Label'
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
      value: function attached() {
        var _this = this;

        this.dropdownList = this.$$('dropdown-list');
        this.dropdownIsShown = false;

        this.dropdownCallback = {
          execute: function execute(selectionString) {
            _this.dropdownIsShown = false;
            _this.dropdownList.classList.remove('dropdown--active');
            _this.callbackHandler.execute(selectionString);
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
      key: '_onTap',
      value: function _onTap(event) {
        if (event.detail.sourceEvent.srcElement !== this.$.dropdownLabel) {
          return;
        }
        this.dropdownIsShown = !this.dropdownIsShown;
        this.dropdownIsShown ? this.dropdownList.classList.add('dropdown--active') : this.dropdownList.classList.remove('dropdown--active');
      }
    }]);

    return DropdownElement;
  })();

  Polymer(DropdownElement);
})();