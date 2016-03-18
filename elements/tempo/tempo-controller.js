'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var TempoController = (function () {
    function TempoController() {
      _classCallCheck(this, TempoController);
    }

    _createClass(TempoController, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'tempo-controller';

        this.properties = {
          metronome: {
            type: Object
          }
        };
      }
    }, {
      key: 'ready',
      value: function ready() {}
    }, {
      key: 'attached',
      value: function attached() {
        this.buttonModel = buildButtonModel.call(this);
      }
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }]);

    return TempoController;
  })();

  Polymer(TempoController);

  function buildButtonModel() {
    var _this = this;

    return {
      callback: function callback(metronomeIsOn) {
        metronomeIsOn ? _this.metronome.start() : _this.metronome.stop();
      }
    };
  }
})();