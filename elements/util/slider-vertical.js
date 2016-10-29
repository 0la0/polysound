'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var SliderVertical = function () {
    function SliderVertical() {
      _classCallCheck(this, SliderVertical);
    }

    _createClass(SliderVertical, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'slider-vertical';

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
        console.warn('deprecated element attached: slider-vertical');
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
        var normalizedPosition = event.detail.y - boundingRect.top;
        var normalValue = normalizedPosition / boundingRect.height;
        normalValue = Math.max(0, Math.min(normalValue, 1));
        var realValue = normalValue * this.valueRange;
        this.sliderValue = this.upperBound - realValue;
      }
    }, {
      key: '_valueChanged',
      value: function _valueChanged(newValue) {
        var normalValue = (newValue - this.lowerBound) / this.valueRange;
        this.$.tracker.style.height = normalValue * 100 + '%';
      }
    }]);

    return SliderVertical;
  }();

  Polymer(SliderVertical);
})();