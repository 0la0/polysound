'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var WIDTH = 120;
  var HEIGHT = 40;
  var HALF_HEIGHT = HEIGHT / 2;
  var RENDER_MAGNITUDE = 15;

  var SampleVisualizer = function () {
    function SampleVisualizer() {
      _classCallCheck(this, SampleVisualizer);
    }

    _createClass(SampleVisualizer, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'sample-visualizer';

        this.properties = {
          bufferSource: {
            type: Object
          },
          playback: {
            type: Object
          }
        };

        this.listeners = {
          'cvs.tap': '_onCanvasInteract',
          'cvs.track': '_onCanvasInteract'
        };

        this.observers = ['_adsrChange(bufferSource.adsr.attack)', '_adsrChange(bufferSource.adsr.sustain)', '_adsrChange(bufferSource.adsr.release)'];
      }
    }, {
      key: 'ready',
      value: function ready() {}
    }, {
      key: 'attached',
      value: function attached() {
        this.$.cvs.width = WIDTH;
        this.$.cvs.height = HEIGHT;
        this.g2d = this.$.cvs.getContext('2d');
        this.g2d.strokeStyle = 'black';
        this.g2d.lineWidth = 2;
        this.g2d.fillStyle = 'rgba(127, 127, 127, 0.5)';
        this.playbackPosition = 0;
      }
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }, {
      key: 'render',
      value: function render() {
        this.bufferSource.getWaveform(200, this._renderCallback.bind(this));
      }
    }, {
      key: '_adsrChange',
      value: function _adsrChange(changeRecord) {
        this._renderSample();
      }
    }, {
      key: '_onCanvasInteract',
      value: function _onCanvasInteract(event) {
        var realPosition = event.detail.x - this.$.cvs.getBoundingClientRect().left;
        var normalPosition = realPosition / WIDTH;
        this.playbackPosition = Math.max(0, Math.min(normalPosition, 1));
        this.playback.callback(this.playbackPosition);
        this._renderSample();
      }
    }, {
      key: '_renderCallback',
      value: function _renderCallback(freqList, min, max) {
        this.freqList = freqList;
        this._renderSample(freqList);
      }
    }, {
      key: '_renderSample',
      value: function _renderSample() {
        var _this = this;

        var playbackStart = (this.playbackPosition || 0) * WIDTH;
        var secondMultiplier = 1 / this.bufferSource.bufferDuration * WIDTH;
        var sustainStart = playbackStart + secondMultiplier * this.bufferSource.adsr.attack;
        var decayStart = sustainStart + secondMultiplier * this.bufferSource.adsr.sustain;
        var decayEnd = decayStart + secondMultiplier * this.bufferSource.adsr.release;

        if (!this.freqList) {
          return;
        }

        //--- DRAW WAVEFORM ---//
        this.g2d.clearRect(0, 0, WIDTH, HEIGHT);
        this.g2d.beginPath();
        this.g2d.moveTo(0, this.freqList[0] + HALF_HEIGHT);
        this.freqList.forEach(function (freqValue, index) {
          var yValue = freqValue * RENDER_MAGNITUDE + HALF_HEIGHT;
          _this.g2d.lineTo(index, yValue);
        });
        this.g2d.stroke();

        //--- FILL PRE-ATTACK REGION---//
        this.g2d.beginPath();
        this.g2d.moveTo(0, 0);
        this.g2d.lineTo(0, HEIGHT);
        this.g2d.lineTo(playbackStart, HEIGHT);
        this.g2d.lineTo(sustainStart, 0);
        this.g2d.fill();

        //--- FILL POST-SUSTAIN REGION---//
        this.g2d.beginPath();
        this.g2d.moveTo(decayStart, 0);
        this.g2d.lineTo(decayEnd, HEIGHT);
        this.g2d.lineTo(WIDTH, HEIGHT);
        this.g2d.lineTo(WIDTH, 0);
        this.g2d.fill();
      }
    }]);

    return SampleVisualizer;
  }();

  Polymer(SampleVisualizer);
})();