'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var SliderHorizontal = function () {
    function SliderHorizontal() {
      _classCallCheck(this, SliderHorizontal);
    }

    _createClass(SliderHorizontal, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'slider-horizontal';

        this.properties = {
          sliderValue: {
            type: Number,
            notify: true,
            value: 0.5,
            observer: '_valueChanged'
          },
          lowerBound: {
            type: Number,
            value: 0
          },
          upperBound: {
            type: Number,
            value: 1
          }
        };

        this.listeners = {
          'down': '_userEvent',
          'track': '_userEvent'
        };
      }
    }, {
      key: 'ready',
      value: function ready() {}
    }, {
      key: 'attached',
      value: function attached() {
        console.warn('deprecated element attached: slider-horizontal');
        this.valueRange = this.upperBound - this.lowerBound;
        this._valueChanged(this.sliderValue);
      }
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }, {
      key: '_userEvent',
      value: function _userEvent(event) {
        var boundingRect = this.getBoundingClientRect();
        var normalizedPosition = event.detail.sourceEvent.pageX - boundingRect.left;
        var normalValue = normalizedPosition / boundingRect.width;
        normalValue = Math.max(0, Math.min(normalValue, 1));
        var realValue = normalValue * this.valueRange;
        this.sliderValue = realValue + this.lowerBound;
      }
    }, {
      key: '_valueChanged',
      value: function _valueChanged(newValue) {
        var normalValue = (newValue - this.lowerBound) / this.valueRange;
        this.$.tracker.style.width = normalValue * 100 + '%';
      }
    }, {
      key: 'behaviors',
      get: function get() {
        return [];
      }
    }]);

    return SliderHorizontal;
  }();

  Polymer(SliderHorizontal);
})();