'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var DropdownList = (function () {
    function DropdownList() {
      _classCallCheck(this, DropdownList);
    }

    _createClass(DropdownList, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'dropdown-list';

        this.properties = {
          listData: {
            type: Array,
            notify: true
          },
          callbackHandler: {
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
        var srcElement = event.detail.sourceEvent.srcElement;
        if (srcElement.id) {
          this.callbackHandler.execute(srcElement.id);
        }
      }
    }]);

    return DropdownList;
  })();

  Polymer(DropdownList);
})();