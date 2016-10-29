'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var DriverContainer = function () {
    function DriverContainer() {
      _classCallCheck(this, DriverContainer);
    }

    _createClass(DriverContainer, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'driver-container';

        this.properties = {
          connectionOutput: {
            type: Object
          },
          driverType: {
            type: String
          },
          instrumentSet: {
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
        var parentContainer = this.$.container;
        var driverOutputContainer = this.$.driverOutputContainer;
        var driverElement = DriverFactory[this.driverType](driverOutputContainer, this.connectionOutput);
        driverElement.removable = buildRemovable.call(this);
        Polymer.dom(parentContainer).appendChild(driverElement);
      }
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }]);

    return DriverContainer;
  }();

  Polymer(DriverContainer);

  function createConnection(instrumentSet) {
    return {
      disconnect: function disconnect(instrument) {
        instrumentSet.delete(instrument);
      },
      connectTo: function connectTo(instrument) {
        instrumentSet.add(instrument);
      },
      getInstrumentSet: function getInstrumentSet() {
        return instrumentSet;
      },
      hasInstrumentSet: true,
      uniqueId: Math.random() * Math.pow(2, 32 - 1) >>> 0
    };
  }

  var DriverFactory = function () {
    function DriverFactory() {
      _classCallCheck(this, DriverFactory);
    }

    _createClass(DriverFactory, null, [{
      key: 'sequencer',
      value: function sequencer(driverOutputContainer, connectionOutput) {
        var instrumentSet = new Set();
        var connectionModel = createConnection(instrumentSet);

        var samplerElement = document.createElement('simple-sequencer');
        samplerElement.instrumentSet = instrumentSet;

        var driverOut = document.createElement('driver-output');
        driverOut.driverModel = connectionModel;
        driverOut.connectionBus = connectionOutput;
        Polymer.dom(driverOutputContainer).appendChild(driverOut);

        return samplerElement;
      }
    }, {
      key: 'multiSequencer',
      value: function multiSequencer(driverOutputContainer, connectionOutput) {
        var numChannels = 5;
        var instrumentList = [];
        var connectionList = [];

        for (var i = 0; i < numChannels; i++) {
          var instrumentSet = new Set();
          var connectionModel = createConnection(instrumentSet);
          instrumentList.push(instrumentSet);
          connectionList.push(connectionModel);
        }

        var samplerElement = document.createElement('multi-sequencer');
        samplerElement.instrumentList = instrumentList;

        for (var _i = 0; _i < numChannels; _i++) {
          var driverOut = document.createElement('driver-output');
          driverOut.driverModel = connectionList[_i];
          driverOut.connectionBus = connectionOutput;
          Polymer.dom(driverOutputContainer).appendChild(driverOut);
        }
        return samplerElement;
      }
    }, {
      key: 'apcSequencer',
      value: function apcSequencer(driverOutputContainer, connectionOutput) {
        var numChannels = 5;
        var instrumentList = [];
        var connectionList = [];

        for (var i = 0; i < numChannels; i++) {
          var instrumentSet = new Set();
          var connectionModel = createConnection(instrumentSet);
          instrumentList.push(instrumentSet);
          connectionList.push(connectionModel);
        }

        var samplerElement = document.createElement('apc-sequencer');
        samplerElement.instrumentList = instrumentList;

        for (var _i2 = 0; _i2 < numChannels; _i2++) {
          var driverOut = document.createElement('driver-output');
          driverOut.driverModel = connectionList[_i2];
          driverOut.connectionBus = connectionOutput;
          Polymer.dom(driverOutputContainer).appendChild(driverOut);
        }
        return samplerElement;
      }
    }, {
      key: 'launchpadSequencer',
      value: function launchpadSequencer(driverOutputContainer, connectionOutput) {
        var numChannels = 5;
        var instrumentList = [];
        var connectionList = [];

        for (var i = 0; i < numChannels; i++) {
          var instrumentSet = new Set();
          var connectionModel = createConnection(instrumentSet);
          instrumentList.push(instrumentSet);
          connectionList.push(connectionModel);
        }

        var samplerElement = document.createElement('launchpad-sequencer');
        samplerElement.instrumentList = instrumentList;

        for (var _i3 = 0; _i3 < numChannels; _i3++) {
          var driverOut = document.createElement('driver-output');
          driverOut.driverModel = connectionList[_i3];
          driverOut.connectionBus = connectionOutput;
          Polymer.dom(driverOutputContainer).appendChild(driverOut);
        }
        return samplerElement;
      }
    }, {
      key: 'grainulator',
      value: function grainulator(driverOutputContainer, connectionOutput) {
        var instrumentSet = new Set();
        var connectionModel = createConnection(instrumentSet);

        var grainElement = document.createElement('custom-grainulator');
        grainElement.instrumentSet = instrumentSet;

        var driverOut = document.createElement('driver-output');
        driverOut.driverModel = connectionModel;
        driverOut.connectionBus = connectionOutput;
        Polymer.dom(driverOutputContainer).appendChild(driverOut);

        return grainElement;
      }
    }, {
      key: 'hillclimber',
      value: function hillclimber(driverOutputContainer, connectionOutput) {
        var numChannels = 5;
        var instrumentList = [];
        var connectionList = [];

        for (var i = 0; i < numChannels; i++) {
          var instrumentSet = new Set();
          var connectionModel = createConnection(instrumentSet);
          instrumentList.push(instrumentSet);
          connectionList.push(connectionModel);
        }

        var samplerElement = document.createElement('hillclimber-sequencer');
        samplerElement.instrumentList = instrumentList;

        for (var _i4 = 0; _i4 < numChannels; _i4++) {
          var driverOut = document.createElement('driver-output');
          driverOut.driverModel = connectionList[_i4];
          driverOut.connectionBus = connectionOutput;
          Polymer.dom(driverOutputContainer).appendChild(driverOut);
        }
        return samplerElement;
      }
    }, {
      key: 'codeSequencer',
      value: function codeSequencer(driverOutputContainer, connectionOutput) {
        var instrumentSet = new Set();
        var connectionModel = createConnection(instrumentSet);

        var samplerElement = document.createElement('code-sequencer');
        samplerElement.instrumentSet = instrumentSet;

        var driverOut = document.createElement('driver-output');
        driverOut.driverModel = connectionModel;
        driverOut.connectionBus = connectionOutput;
        Polymer.dom(driverOutputContainer).appendChild(driverOut);

        return samplerElement;
      }
    }]);

    return DriverFactory;
  }();

  function buildRemovable() {
    var _this = this;

    return {
      callback: function callback() {
        var outputList = Array.prototype.slice.call(_this.$.driverOutputContainer.childNodes);
        outputList.forEach(function (outputNode) {
          _this.connectionOutput.helpers.removeElement(outputNode.driverModel);
        });
        Polymer.dom(_this).parentNode.removeChild(_this);
      }
    };
  }
})();