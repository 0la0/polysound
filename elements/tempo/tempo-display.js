'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var TempoDisplay = (function () {
    function TempoDisplay() {
      _classCallCheck(this, TempoDisplay);
    }

    _createClass(TempoDisplay, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'tempo-display';

        this.properties = {
          tempo: {
            type: Number,
            notify: true,
            value: 120
          }
        };

        this.listeners = {
          'down': '_onDown',
          'track': '_onTrack'
        };
      }
    }, {
      key: 'ready',
      value: function ready() {}
    }, {
      key: 'attached',
      value: function attached() {}
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }, {
      key: '_onDown',
      value: function _onDown(event) {
        this.lastTrackPostion = null;
      }
    }, {
      key: '_onTrack',
      value: function _onTrack(event) {
        if (!this.lastTrackPostion) {
          this.lastTrackPostion = event.detail;
          return;
        }

        var deltaX = event.detail.x - this.lastTrackPostion.x;
        var adjustedTempo = this.tempo + deltaX / 5;
        this.tempo = Math.round(adjustedTempo);
        this.lastTrackPostion = event.detail;
      }
    }, {
      key: 'behaviors',
      get: function get() {
        return [];
      }
    }]);

    return TempoDisplay;
  })();

  Polymer(TempoDisplay);
})();