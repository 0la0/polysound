'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var ConnectorInput = function () {
    function ConnectorInput() {
      _classCallCheck(this, ConnectorInput);
    }

    _createClass(ConnectorInput, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'connector-input';

        this.properties = {
          audioNode: {
            type: Object
          },
          connectionBus: {
            type: Object
          }
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
      key: 'addConnection',
      value: function addConnection(inputInstrument, outputElement) {
        inputInstrument.connectTo(this.audioNode.getInput());
        var connectionKey = inputInstrument.uniqueId + '' + this.audioNode.uniqueId;
        this.connectionBus.finishLine(connectionKey, inputInstrument.getOutput(), this.audioNode.getInput(), this, outputElement);
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

    return ConnectorInput;
  }();

  Polymer(ConnectorInput);
})();