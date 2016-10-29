'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var Slider = function () {
    function Slider() {
      _classCallCheck(this, Slider);
    }

    _createClass(Slider, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'slider-bidirectional';

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
          },
          direction: {
            type: String,
            value: 'horizontal'
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
        this.direction = this.direction === 'column' ? 'vertical' : 'horizontal';
        applyStylingStrategy.call(this, this.direction);
        this.directionStrategy = buildDirectionStrategy.call(this, this.direction);
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
        this.directionStrategy.userEvent(event);
      }
    }, {
      key: '_valueChanged',
      value: function _valueChanged(newValue) {
        if (!this.directionStrategy) {
          return;
        }
        this.directionStrategy.valueChanged(newValue);
      }
    }]);

    return Slider;
  }();

  function applyStylingStrategy(directionStrategy) {
    var slider = this;
    var directions = {
      vertical: function vertical() {
        slider.$.slider.classList.add('slider--vertical');
        slider.$.tracker.classList.add('slider__tracker--vertical');
      },
      horizontal: function horizontal() {
        slider.$.slider.classList.add('slider--horizontal');
        slider.$.tracker.classList.add('slider__tracker--horizontal');
      }
    };
    return directions[directionStrategy]();
  }

  function buildDirectionStrategy(directionStrategy) {
    var slider = this;
    var directions = {

      horizontal: {
        userEvent: function userEvent(event) {
          var boundingRect = slider.getBoundingClientRect();
          var normalizedPosition = event.detail.sourceEvent.pageX - boundingRect.left;
          var normalValue = normalizedPosition / boundingRect.width;
          normalValue = Math.max(0, Math.min(normalValue, 1));
          var realValue = normalValue * slider.valueRange;
          slider.sliderValue = realValue + slider.lowerBound;
        },
        valueChanged: function valueChanged(newValue) {
          var normalValue = (newValue - slider.lowerBound) / slider.valueRange;
          slider.$.tracker.style.width = normalValue * 100 + '%';
        }
      },

      vertical: {
        userEvent: function userEvent(event) {
          var boundingRect = slider.getBoundingClientRect();
          var normalizedPosition = event.detail.y - boundingRect.top;
          var normalValue = normalizedPosition / boundingRect.height;
          normalValue = Math.max(0, Math.min(normalValue, 1));
          var realValue = normalValue * slider.valueRange;
          slider.sliderValue = slider.upperBound - realValue;
        },
        valueChanged: function valueChanged(newValue) {
          var normalValue = (newValue - slider.lowerBound) / slider.valueRange;
          slider.$.tracker.style.height = normalValue * 100 + '%';
        }
      }

    };
    return directions[directionStrategy];
  }

  Polymer(Slider);
})();