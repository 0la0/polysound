'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var Compressor = (function () {
    function Compressor() {
      _classCallCheck(this, Compressor);
    }

    _createClass(Compressor, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'simple-compressor';

        this.properties = {
          compressorModel: {
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
        this.removable = removable.call(this);
      }
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }]);

    return Compressor;
  })();

  Polymer(Compressor);

  function removable() {
    var _this = this;

    return {
      callback: function callback() {
        _this.connectionInput.helpers.removeElement(_this.compressorModel.input);
        _this.connectionOutput.helpers.removeElement(_this.compressorModel.getOutput());
        Polymer.dom(_this).parentNode.removeChild(_this);
      }
    };
  }
})();