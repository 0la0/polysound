'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var SimpleDelay = (function () {
    function SimpleDelay() {
      _classCallCheck(this, SimpleDelay);
    }

    _createClass(SimpleDelay, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'simple-delay';

        this.properties = {
          delayModel: {
            type: Object
          },
          connectionInput: {
            type: Object
          },
          connectionOutput: {
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
      value: function attached() {
        this.multiSelectModel = buildMultiSelectModel.call(this);
        this.removable = importRemovable.call(this, this.delayModel);
      }
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }]);

    return SimpleDelay;
  })();

  Polymer(SimpleDelay);

  function buildMultiSelectModel() {
    var _this = this;

    return {
      list: [{
        display: '0.5x',
        value: '0.5'
      }, {
        display: '1x',
        value: '1'
      }, {
        display: '2x',
        value: '2'
      }],
      callback: function callback(delayValue) {
        //TODO: sync with actual tempo
        _this.delayModel.setQuatization(120, delayValue);
      }
    };
  }
})();