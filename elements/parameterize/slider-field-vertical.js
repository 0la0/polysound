'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var SliderField = function () {
    function SliderField() {
      _classCallCheck(this, SliderField);
    }

    _createClass(SliderField, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'slider-field-vertical';

        this.properties = {
          numSteps: {
            type: Number,
            value: 16
          },
          boundValue: {
            type: Number,
            notify: true
          },
          modulatable: {
            type: Object
          },
          isScheduled: {
            type: Boolean,
            notify: true,
            value: false,
            observer: '_onScheduleChange'
          }
        };

        this.listeners = {
          'down': '_userEvent',
          'track': '_userEvent'
        };
      }
    }, {
      key: 'ready',
      value: function ready() {
        this.tracker = this.$$('#tracker');
        this.valueRange = this.upperBound - this.lowerBound;
      }
    }, {
      key: 'attached',
      value: function attached() {
        this.cvs = this.$$('canvas');
        this.g2d = this.cvs.getContext('2d');
        this.g2d.fillStyle = '#333';
        this.values = Array(this.numSteps).fill(this.boundValue); //TODO: fill with poperty value


        this.schedulable = buildSchedulable.call(this);
        this.renderHeight = 7;
        this.textArea = this.$$('textarea');

        this.stepWidth = this.cvs.width / this.numSteps;
        if (this.g2d) {
          this.g2d.width = this.cvs.width;
          this.g2d.height = this.cvs.height;
        }
        this._renderAllBuckets();

        if (this.modulatable) {
          var lfoElement = document.createElement('lfo-parameter');
          lfoElement.modulatable = this.modulatable;
          this.$.lfoContainer.appendChild(lfoElement);
        }
      }
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }, {
      key: '_onScheduleChange',
      value: function _onScheduleChange(isScheduled) {
        isScheduled ? app.scheduler.register(this.schedulable) : app.scheduler.deregister(this.schedulable);
      }
    }, {
      key: '_evaluateInput',
      value: function _evaluateInput() {
        var inputValue = this.textArea.value;
        if (inputValue) {
          for (var i = 0; i < this.numSteps; i++) {
            var percentStep = i / this.numSteps;

            try {
              var stepValue = evaluateInput(percentStep, inputValue);
              this.values[i] = stepValue;
            } catch (error) {}
          }
        }
      }
    }, {
      key: '_userEvent',
      value: function _userEvent(event) {
        var boundingClientRect = this.cvs.getBoundingClientRect();

        var normalizedPositionX = event.detail.x - boundingClientRect.left;
        var normalX = normalizedPositionX / boundingClientRect.width;
        normalX = Math.max(0, Math.min(normalX, 1));

        var normalizedPositionY = event.detail.y - boundingClientRect.top;
        var normalY = normalizedPositionY / boundingClientRect.height;
        normalY = Math.max(0, Math.min(normalY, 1));

        var stepBucket = Math.floor(normalX * this.numSteps);
        this._renderBucket(stepBucket, normalY, normalX);
      }
    }, {
      key: '_renderBucket',
      value: function _renderBucket(step, value, normalX) {
        var positionX = step / this.numSteps * this.g2d.width;
        var previousValue = this.values[step];
        this.values[step] = value;

        var previousY = previousValue * this.g2d.height;
        var currentY = value * this.g2d.height;

        this.g2d.clearRect(positionX, previousY - 1, this.stepWidth, this.renderHeight + 2);
        this.g2d.fillRect(positionX, currentY, this.stepWidth, this.renderHeight);
      }
    }, {
      key: '_renderAllBuckets',
      value: function _renderAllBuckets() {
        var _this = this;

        this.g2d.clearRect(0, 0, this.g2d.width, this.g2d.height);
        this.values.forEach(function (value, index) {
          var x = index / _this.numSteps * _this.g2d.width;
          var y = value * _this.g2d.height;
          _this.g2d.fillRect(x, y, _this.stepWidth, _this.renderHeight);
        });
      }
    }, {
      key: '_renderStep',
      value: function _renderStep(step) {
        var _this2 = this;

        this.g2d.clearRect(0, 0, this.g2d.width, this.g2d.height);
        this.values.forEach(function (value, index) {
          var x = index / _this2.numSteps * _this2.g2d.width;
          var y = value * _this2.g2d.height;
          _this2.g2d.fillRect(x, y, _this2.stepWidth, _this2.renderHeight);
        });

        var positionX = step / this.numSteps * this.g2d.width;
        this.g2d.fillRect(positionX, 0, this.stepWidth, this.g2d.height);
      }
    }, {
      key: '_updateBoundValue',
      value: function _updateBoundValue(step) {
        this.boundValue = this.values[step];
      }
    }]);

    return SliderField;
  }();

  Polymer(SliderField);

  function buildSchedulable() {
    var _this3 = this;

    return {
      processTick: function processTick(beatNumber, time) {},
      render: function render(beatNumber, lastBeatNumber) {
        _this3._updateBoundValue(beatNumber);
        _this3._renderStep(beatNumber);
        if (beatNumber === _this3.numSteps - 1) {
          _this3._evaluateInput();
        }
      },
      start: function start() {},
      stop: function stop() {}
    };
  }

  //TODO: Error handing on caller and have this return an array
  function evaluateInput(percentStep, evalString) {
    try {
      var theta = percentStep * 2 * Math.PI;
      return eval(evalString);
    } catch (error) {
      throw new Error('Evaluation Error');
    }
  }
})();