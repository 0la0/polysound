'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var DriverFactory = (function () {
    function DriverFactory() {
      _classCallCheck(this, DriverFactory);
    }

    _createClass(DriverFactory, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'driver-factory';

        this.properties = {
          driverList: {
            type: Array
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

        this.driverContainer = Polymer.dom(this.parent).querySelector('#driver-container');

        this.driverTable = {
          'Sequencer': 'sequencer',
          'Multi Sequencer': 'multiSequencer',
          'Grainulator': 'grainulator',
          'APC Sequencer': 'apcSequencer',
          'Hillclimber': 'hillclimber',
          'Launchpad Sequencer': 'launchpadSequencer',
          'Code Sequencer': 'codeSequencer'
        };
        this.driverList = Object.keys(this.driverTable);

        this.callbackHandler = {
          execute: function execute(selectionString) {
            var selectionValue = _this.driverTable[selectionString];
            if (selectionValue) {
              _this._buildElement(selectionValue);
            }
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
      key: '_buildElement',
      value: function _buildElement(selectionValue) {
        var driverElement = document.createElement('driver-container');
        driverElement.connectionOutput = app.connectionBusses.drivers;
        driverElement.driverType = selectionValue;
        Polymer.dom(this.driverContainer).appendChild(driverElement);
      }
    }]);

    return DriverFactory;
  })();

  Polymer(DriverFactory);
})();