'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var Equalizer = function () {
    function Equalizer() {
      _classCallCheck(this, Equalizer);
    }

    _createClass(Equalizer, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'equalizer-three';

        this.properties = {
          equalizerModel: {
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
        var outputElement = this.$$('connector-output');
        if (!this.connectionOutput) {
          Polymer.dom(this.root).removeChild(outputElement);
          this.$$('element-header').removeCloseButton();
        } else {
          this.removable = importRemovable.call(this, this.equalizerModel);
        }
      }
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }]);

    return Equalizer;
  }();

  Polymer(Equalizer);
})();