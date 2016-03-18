'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var SampleVisualizer = (function () {
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
        this.cvs = this.$$('canvas');
        this.cvs.width = 120;
        this.cvs.height = 40;
        this.g2d = this.cvs.getContext('2d');
        this.g2d.halfHeight = 20;
        this.g2d.strokeStyle = "black";
        this.g2d.lineWidth = 2;
        this.g2d.fillStyle = "white";
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
        this.g2d.fillRect(0, 0, this.cvs.width, this.cvs.height);
        this.bufferSource.getWaveform(200, this._renderCallback.bind(this));
      }
    }, {
      key: '_renderCallback',
      value: function _renderCallback(freqList, min, max) {
        var halfHeight = this.g2d.halfHeight;
        this.g2d.beginPath();
        this.g2d.moveTo(0, freqList[0] + halfHeight);
        for (var i = 1; i < freqList.length; i++) {
          var yValue = freqList[i] * 15 + halfHeight;
          this.g2d.lineTo(i, yValue);
        }
        this.g2d.stroke();
      }
    }]);

    return SampleVisualizer;
  })();

  Polymer(SampleVisualizer);
})();