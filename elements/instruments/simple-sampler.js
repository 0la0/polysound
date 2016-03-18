'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var SimpleSampler = (function () {
    function SimpleSampler() {
      _classCallCheck(this, SimpleSampler);
    }

    _createClass(SimpleSampler, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'simple-sampler';

        this.properties = {
          samplerModel: {
            type: Object
          },
          connectionInput: {
            type: Object
          },
          connectionOutput: {
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
        var _this = this;

        this.samplerVisualizer = this.$$('sample-visualizer');
        this.samplerLoader = {
          newSample: function newSample(samplePath) {
            var sample = app.audio.sampleMap.get(samplePath);
            _this.samplerModel.setSample(sample);
            _this.samplerVisualizer.render();
          }
        };
        this.triggerButtonModel = buildButtonModel.call(this);
        this.removable = importRemovable.call(this, this.samplerModel);
      }
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }]);

    return SimpleSampler;
  })();

  Polymer(SimpleSampler);

  function buildButtonModel() {
    var _this2 = this;

    return {
      callback: function callback(btnIsOn) {
        if (btnIsOn) {
          _this2.samplerModel.play(0, 0);
        }
      }
    };
  }
})();