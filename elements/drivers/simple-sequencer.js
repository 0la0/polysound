'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var SimpleSequencer = (function () {
    function SimpleSequencer() {
      _classCallCheck(this, SimpleSequencer);
    }

    _createClass(SimpleSequencer, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'simple-sequencer';

        this.properties = {
          instrumentSet: {
            type: Object
          },
          removable: {
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
        var _this = this;

        this.isReset = true;
        this.schedulable = buildSchedulable.call(this);
        app.scheduler.register(this.schedulable);

        var matrixNodeList = this.getElementsByClassName('matrix');
        this.matrixList = Array.prototype.slice.call(matrixNodeList);
        this.activeIndex;

        this.clipManager = buildClipManager(this.matrixList, function (activeIndex) {
          _this.activeIndex = activeIndex;
          _this.isReset = true;
        });

        setTimeout(function () {
          _this.matrixList[0].setAsActive();
        }, 0);
      }
    }, {
      key: 'detached',
      value: function detached() {
        app.scheduler.deregister(this.schedulable);
      }
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }]);

    return SimpleSequencer;
  })();

  Polymer(SimpleSequencer);

  function buildSchedulable() {
    var _this2 = this;

    return {
      processTick: function processTick(beatNumber, time) {
        var columnData = _this2.matrixList[_this2.activeIndex].getColumnValueList(beatNumber);
        columnData.forEach(function (matrixElement, index) {
          var note = index - 6;
          if (matrixElement) {
            _this2.instrumentSet.forEach(function (instrument) {
              instrument.play(note, time);
            });
          }
        });
      },
      render: function render(beatNumber, lastBeatNumber) {
        _this2.matrixList[_this2.activeIndex].render(beatNumber, lastBeatNumber, _this2.isReset);

        if (_this2.isReset) {
          _this2.isReset = false;
        }
      },
      start: function start() {
        _this2.isReset = true;
      },
      stop: function stop() {
        _this2.matrixList[_this2.activeIndex].stop();
      }
    };
  }

  function buildClipManager(matrixList, setActiveIndex) {
    return {
      queueActive: function queueActive(matrixElement) {
        var activeIndex = matrixList.indexOf(matrixElement);
        setActiveIndex(activeIndex);
        matrixList.forEach(function (matrix, index) {
          if (index !== activeIndex) {
            matrix.setAsInactive();
            matrix.stop();
          }
        });
      },
      onMatrixChange: function onMatrixChange(matrixElement, row, column, value) {}
    };
  }
})();