'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var SamplerLoader = (function () {
    function SamplerLoader() {
      _classCallCheck(this, SamplerLoader);
    }

    _createClass(SamplerLoader, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'sampler-loader';

        this.properties = {
          parentEventHandler: {
            type: Object
          }
        };

        this.listeners = {
          down: '_handleClick'
        };
      }
    }, {
      key: 'ready',
      value: function ready() {}
    }, {
      key: 'attached',
      value: function attached() {
        var _this = this;

        this.dropdownElement = this.$$('dropdown-element');
        this.activeSampleLabel = 'Load Sample';

        this.callbackHandler = {
          execute: function execute(selectionString) {
            _this.parentEventHandler.newSample(selectionString);
            _this.activeSampleLabel = getSampleName(selectionString);
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
      key: '_handleClick',
      value: function _handleClick(event) {
        if (event.detail.sourceEvent.srcElement !== this.$.dropdownElement) {
          //rehydrate list
          this.listData = Array.from(app.audio.sampleMap.keys());
          return;
        }
      }
    }]);

    return SamplerLoader;
  })();

  Polymer(SamplerLoader);

  function getSampleName(originalName) {
    var tokens = originalName.split('/');
    var name = tokens[1] || originalName;
    return name.split('.')[0];
  }
})();