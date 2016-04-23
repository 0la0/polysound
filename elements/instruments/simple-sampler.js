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

        this.listeners = {
          'sampleListDropdown.tap': '_handleDropdownClick'
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
        this.triggerButtonModel = buildButtonModel.call(this);
        this.removable = importRemovable.call(this, this.samplerModel);

        this.dropdownCallbackHandler = {
          execute: function execute(selectionString) {
            var sample = app.audio.sampleMap.get(selectionString);
            _this.activeSampleLabel = getSampleName(selectionString);
            _this.samplerModel.setSample(sample);
            _this.samplerVisualizer.render();
          }
        };

        this.playback = {
          callback: function callback(position) {
            _this.samplePosition = position;
          }
        };
      }
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }, {
      key: '_handleDropdownClick',
      value: function _handleDropdownClick(event) {
        if (event.detail.sourceEvent.srcElement !== this.$.sampleListDropdown) {
          //rehydrate list
          this.dropdownListData = Array.from(app.audio.sampleMap.keys());
        }
      }
    }]);

    return SimpleSampler;
  })();

  Polymer(SimpleSampler);

  function buildButtonModel() {
    var _this2 = this;

    return {
      callback: function callback(btnIsOn) {
        if (btnIsOn) {
          var position = _this2.samplePosition * _this2.samplerModel.getDuration();
          _this2.samplerModel.play(0, 0, position);
        }
      }
    };
  }

  function getSampleName(originalName) {
    var tokens = originalName.split('/');
    var name = tokens[1] || originalName;
    return name.split('.')[0];
  }
})();