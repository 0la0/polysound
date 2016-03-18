'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var LineConnector = (function () {
    function LineConnector() {
      _classCallCheck(this, LineConnector);
    }

    _createClass(LineConnector, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'line-connector';

        this.properties = {
          pointOne: {
            type: Object,
            value: { x: 0, y: 0 }
          },
          pointTwo: {
            type: Object,
            value: { x: 60, y: 50 }
          }
        };

        this.listeners = {
          down: '_handleClick',
          track: '_handleTrack'
        };
      }
    }, {
      key: 'ready',
      value: function ready() {
        var _this = this;

        this.circleOne = this.$$('#circle01');
        this.circleTwo = this.$$('#circle02');
        this.line = this.$$('line');
        this.circleIsTracking = false;

        // window.addEventListener('resize', (event) => {
        //   this.boundingClientRect = this.getBoundingClientRect();
        // });
        setTimeout(function () {
          _this.boundingClientRect = _this.getBoundingClientRect();
        }, 0);
      }
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
      key: '_handleClick',
      value: function _handleClick(event) {
        if (event.target === this.circleTwo) {
          this.circleIsTracking = true;
        }
      }
    }, {
      key: '_handleTrack',
      value: function _handleTrack(event) {
        if (event.detail.state === 'end') {
          this.circleIsTracking = false;
        }

        if (this.circleIsTracking) {
          var mouseX = event.detail.x - this.boundingClientRect.left;
          var mouseY = event.detail.y - this.boundingClientRect.top;
          this.pointTwo.x = mouseX;
          this.pointTwo.y = mouseY;

          this.circleTwo.setAttribute('cx', this.pointTwo.x);
          this.circleTwo.setAttribute('cy', this.pointTwo.y);

          this.line.setAttribute('x2', this.pointTwo.x);
          this.line.setAttribute('y2', this.pointTwo.y);
        }
      }
    }]);

    return LineConnector;
  })();

  Polymer(LineConnector);
})();