'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var MultiSelect = function () {
    function MultiSelect() {
      _classCallCheck(this, MultiSelect);
    }

    _createClass(MultiSelect, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'multi-select';

        this.properties = {
          selectModel: {
            type: Object
          },
          defaultIndex: {
            type: Number,
            value: 0
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

        setTimeout(function () {
          var selectorNodeList = _this.getElementsByClassName('selector');
          _this.selectorElementList = Array.prototype.slice.call(selectorNodeList);
          _this.selectorElementList[_this.defaultIndex].classList.add('selector--active');

          //set initial value
          var initialElement = _this.selectorElementList[_this.defaultIndex];
          var initialValue = initialElement.getAttribute('id');
          _this._setValue(initialValue, initialElement);
        }, 0);
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
        var srcElement = event.detail.sourceEvent.srcElement;
        var srcValue = srcElement.getAttribute('id');
        if (!srcValue) {
          return;
        }
        this._setValue(srcValue, srcElement);
      }
    }, {
      key: '_setValue',
      value: function _setValue(srcValue, srcElement) {
        this.selectModel.callback(srcValue);
        //update view
        srcElement.classList.add('selector--active');
        this.selectorElementList.forEach(function (element) {
          element === srcElement ? element.classList.add('selector--active') : element.classList.remove('selector--active');
        });
      }
    }]);

    return MultiSelect;
  }();

  Polymer(MultiSelect);
})();