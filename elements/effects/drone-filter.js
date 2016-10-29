'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var DroneFilter = function () {
    function DroneFilter() {
      _classCallCheck(this, DroneFilter);
    }

    _createClass(DroneFilter, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'drone-filter';

        this.properties = {
          filterModel: {
            type: Object
          },
          connectionInput: {
            type: Object
          },
          connectionOutput: {
            type: Object
          },
          baseFrequency: {
            type: Number,
            value: 440,
            notify: true,
            observer: '_onBaseFrequencyChange'
          }
        };

        this.listeners = {};
      }
    }, {
      key: 'ready',
      value: function ready() {}
    }, {
      key: 'attached',
      value: function attached() {
        this.removable = importRemovable.call(this, this.filterModel);
      }
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }, {
      key: '_onBaseFrequencyChange',
      value: function _onBaseFrequencyChange(newValue) {
        if (this.filterModel) {
          this.filterModel.setBaseFrequency(newValue);
        }
      }
    }]);

    return DroneFilter;
  }();

  Polymer(DroneFilter);
})();