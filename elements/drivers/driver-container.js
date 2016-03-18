'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var DriverContainer = (function () {
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
        var driverElement = undefined;
        if (this.driverType === 'sequencer') {
          driverElement = DriverFactory.createSequencer(driverOutputContainer, this.connectionOutput);
        } else if (this.driverType === 'multiSequencer') {
          var NUM_CHANNELS = 5;
          driverElement = DriverFactory.createMultiSequencer(NUM_CHANNELS, driverOutputContainer, this.connectionOutput);
        } else if (this.driverType === 'grainulator') {
          driverElement = DriverFactory.createGrainulator(driverOutputContainer, this.connectionOutput);
        } else if (this.driverType === 'apcSequencer') {
          var NUM_CHANNELS = 5;
          driverElement = DriverFactory.createApcSequencer(NUM_CHANNELS, driverOutputContainer, this.connectionOutput);
        } else if (this.driverType === 'hillclimber') {
          var NUM_CHANNELS = 5;
          driverElement = DriverFactory.createHillclimberSequencer(NUM_CHANNELS, driverOutputContainer, this.connectionOutput);
        } else if (this.driverType === 'launchpadSequencer') {
          var NUM_CHANNELS = 5;
          driverElement = DriverFactory.createLaunchpadSequencer(NUM_CHANNELS, driverOutputContainer, this.connectionOutput);
        }
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
  })();

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

  var DriverFactory = (function () {
    function DriverFactory() {
      _classCallCheck(this, DriverFactory);
    }

    _createClass(DriverFactory, null, [{
      key: 'createSequencer',
      value: function createSequencer(driverOutputContainer, connectionOutput) {
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
      key: 'createMultiSequencer',
      value: function createMultiSequencer(numChannels, driverOutputContainer, connectionOutput) {
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

        for (var i = 0; i < numChannels; i++) {
          var driverOut = document.createElement('driver-output');
          driverOut.driverModel = connectionList[i];
          driverOut.connectionBus = connectionOutput;
          Polymer.dom(driverOutputContainer).appendChild(driverOut);
        }
        return samplerElement;
      }
    }, {
      key: 'createApcSequencer',
      value: function createApcSequencer(numChannels, driverOutputContainer, connectionOutput) {
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

        for (var i = 0; i < numChannels; i++) {
          var driverOut = document.createElement('driver-output');
          driverOut.driverModel = connectionList[i];
          driverOut.connectionBus = connectionOutput;
          Polymer.dom(driverOutputContainer).appendChild(driverOut);
        }
        return samplerElement;
      }
    }, {
      key: 'createLaunchpadSequencer',
      value: function createLaunchpadSequencer(numChannels, driverOutputContainer, connectionOutput) {
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

        for (var i = 0; i < numChannels; i++) {
          var driverOut = document.createElement('driver-output');
          driverOut.driverModel = connectionList[i];
          driverOut.connectionBus = connectionOutput;
          Polymer.dom(driverOutputContainer).appendChild(driverOut);
        }
        return samplerElement;
      }
    }, {
      key: 'createGrainulator',
      value: function createGrainulator(driverOutputContainer, connectionOutput) {
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
      key: 'createHillclimberSequencer',
      value: function createHillclimberSequencer(numChannels, driverOutputContainer, connectionOutput) {
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

        for (var i = 0; i < numChannels; i++) {
          var driverOut = document.createElement('driver-output');
          driverOut.driverModel = connectionList[i];
          driverOut.connectionBus = connectionOutput;
          Polymer.dom(driverOutputContainer).appendChild(driverOut);
        }
        return samplerElement;
      }
    }]);

    return DriverFactory;
  })();

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