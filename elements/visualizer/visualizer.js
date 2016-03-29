'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var Visualizer = (function () {
    function Visualizer() {
      _classCallCheck(this, Visualizer);
    }

    _createClass(Visualizer, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'sound-visualizer';

        this.properties = {
          model: {
            type: Object
          }
        };

        this.listeners = {
          'timeDomainCanvas.tap': '_onTimeCanvasTap',
          'frequencyDomainCanvas.tap': '_onFreqCanvasTap'
        };
      }
    }, {
      key: 'ready',
      value: function ready() {}
    }, {
      key: 'attached',
      value: function attached() {
        this.isOn = false;
        this.timeIsOn = false;
        this.freqIsOn = false;

        this.width = 200;
        this.height = 100;

        this.$.timeDomainCanvas.width = this.width;
        this.$.timeDomainCanvas.height = this.height;
        this.g2dTime = getGraphicsContext(this.$.timeDomainCanvas, this.width, this.height);

        this.$.frequencyDomainCanvas.width = this.width;
        this.$.frequencyDomainCanvas.height = this.height;
        this.g2dFreq = getGraphicsContext(this.$.frequencyDomainCanvas, this.width, this.height);

        this.toggleButtonModel = buildToggleButton.call(this);
      }
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }, {
      key: '_onTimeCanvasTap',
      value: function _onTimeCanvasTap() {
        this.timeIsOn = !this.timeIsOn;
      }
    }, {
      key: '_onFreqCanvasTap',
      value: function _onFreqCanvasTap() {
        this.freqIsOn = !this.freqIsOn;
      }
    }, {
      key: '_onTap',
      value: function _onTap(event) {
        this._draw();
      }
    }, {
      key: '_turnOn',
      value: function _turnOn() {
        this.isOn = true;
        this.timeIsOn = true;
        this.freqIsOn = true;
        this._draw();
      }
    }, {
      key: '_draw',
      value: function _draw() {
        var _this = this;

        var timeData = this.model.getTimeData();
        var freqData = this.model.getFrequencyData();
        var step = timeData.length / this.width;

        if (this.timeIsOn) {
          this.g2dTime.clearRect(0, 0, this.width, this.height);
          this.g2dTime.beginPath();
          timeData.forEach(function (value, index) {
            var normalValue = value / 256 * 100;
            var x = step * index;
            var y = 256 / _this.height + normalValue;
            index === 0 ? _this.g2dTime.moveTo(x, y) : _this.g2dTime.lineTo(x, y);
          });
          this.g2dTime.stroke();
        }

        if (this.freqIsOn) {
          this.g2dFreq.clearRect(0, 0, this.width, this.height);
          freqData.forEach(function (value, index) {
            var x = step * index;
            var height = value / 256 * _this.height;
            _this.g2dFreq.fillRect(x, 0, step, height);
          });
        }

        if (this.isOn) {
          requestAnimationFrame(this._draw.bind(this));
        }
      }
    }]);

    return Visualizer;
  })();

  function getGraphicsContext(canvasElement, width, height) {
    var g2d = canvasElement.getContext('2d');
    g2d.strokeStyle = "black";
    g2d.lineWidth = 2;
    g2d.fillStyle = "black";
    g2d.translate(0, height);
    g2d.scale(1, -1);
    return g2d;
  }

  function buildToggleButton() {
    var _this2 = this;

    return {
      callback: function callback(isActive) {
        if (isActive) {
          _this2.model.connect();
          _this2.$.visualizerContainer.classList.add('visualizer__display--visible');
          _this2._turnOn();
        } else {
          _this2.model.disconnect();
          _this2.$.visualizerContainer.classList.remove('visualizer__display--visible');
          _this2.isOn = false;
        }
      }
    };
  }

  Polymer(Visualizer);
})();