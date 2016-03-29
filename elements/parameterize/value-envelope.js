'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var Envelope = (function () {
    function Envelope() {
      _classCallCheck(this, Envelope);
    }

    _createClass(Envelope, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'value-envelope';

        this.properties = {
          boundValue: {
            type: Number,
            notify: true
          },
          direction: {
            type: String
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
        this.onpenButtonModel = buildOnButtonModel.call(this);
        this.scheduleButtonModel = buildScheduleButtonModel.call(this);

        if (this.direction === 'row') {
          this.$.envelopeTrigger.style.setProperty('flex-direction', 'column');
          this.$.envelopeContainer.classList.add('enveloper__container--horizontal');
        } else {
          this.$.envelopeContainer.classList.add('enveloper__container--vertical');
        }
      }
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }]);

    return Envelope;
  })();

  Polymer(Envelope);

  function buildOnButtonModel() {
    var _this = this;

    return {
      callback: function callback(isOpen) {
        _this.$.envelopeContainer.classList.toggle('envelope__container--active');
      }
    };
  }

  function buildScheduleButtonModel() {
    var _this2 = this;

    return {
      callback: function callback(isScheduled) {
        _this2.isScheduled = isScheduled;
      }
    };
  }
})();