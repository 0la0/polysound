'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var DriverOutput = function () {
    function DriverOutput() {
      _classCallCheck(this, DriverOutput);
    }

    _createClass(DriverOutput, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'driver-output';

        this.properties = {
          driverModel: {
            type: Object
          },
          connectionBus: {
            type: Object
          }
        };

        this.listeners = {
          down: '_onDown',
          track: '_onTrack',
          tap: '_onTap'
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
        this.connectionBus.createLine(event.detail.sourceEvent.pageX, event.detail.sourceEvent.pageY);
      }
    }, {
      key: '_onTrack',
      value: function _onTrack(event) {
        if (event.detail.state === 'end') {
          this._onEnd(event);
          return;
        }
        this.connectionBus.moveLine(event.detail.sourceEvent.pageX, event.detail.sourceEvent.pageY);
      }
    }, {
      key: '_onEnd',
      value: function _onEnd(event) {
        var endElement = event.detail.hover();
        if (endElement.tagName === 'DRIVER-INPUT') {
          endElement.addConnection(this.driverModel, this);
        } else {
          this.connectionBus.destroyLine();
        }
      }
    }, {
      key: '_onTap',
      value: function _onTap(event) {
        this.connectionBus.destroyLine();
      }
    }, {
      key: 'getPosition',
      value: function getPosition() {
        var boundingRect = this.getBoundingClientRect();
        var x = boundingRect.left + document.body.scrollLeft + Math.round(boundingRect.width / 2);
        var y = boundingRect.top + document.body.scrollTop + Math.round(boundingRect.height / 2);
        return { x: x, y: y };
      }
    }]);

    return DriverOutput;
  }();

  Polymer(DriverOutput);
})();