'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var HillclimberElement = function () {
    function HillclimberElement() {
      _classCallCheck(this, HillclimberElement);
    }

    _createClass(HillclimberElement, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'hillclimber-sequencer';

        this.properties = {
          instrumentList: {
            type: Array
          },
          removable: {
            type: Object
          }
        };

        this.listeners = {
          'createNewGoal.tap': '_newGoalTap'
        };
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
        this.currentFitnessValue = 0;

        var matrixNodeList = this.getElementsByClassName('search-matrix');
        this.searchMatrix = Array.prototype.slice.call(matrixNodeList)[0];

        matrixNodeList = this.getElementsByClassName('goal-matrix');
        this.goalMatrix = Array.prototype.slice.call(matrixNodeList)[0];

        this.clipManager = buildClipManager(this.searchMatrix, function (activeIndex) {
          _this.activeIndex = activeIndex;
          _this.isReset = true;
        });

        this.multiSelectModel = buildMultiSelectModel.call(this);

        this.goalElementList = [null, null];

        setTimeout(function () {
          var trainingElements = _this.getElementsByClassName('hillclimber__matrix-train');
          _this.trainingMatricies = Array.prototype.slice.call(trainingElements);
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
    }, {
      key: '_newGoalTap',
      value: function _newGoalTap(event) {
        this.push('goalElementList', null);
      }
    }, {
      key: '_startHillclimber',
      value: function _startHillclimber() {
        var goalStates = this.trainingMatricies.map(function (matrixElement) {
          return matrixElement.getModel();
        });
        this.hillclimber = new HillclimberDriver(goalStates);
        this.searchMatrix.setModel(this.hillclimber.currentState);
        this.goalMatrix.setModel(this.hillclimber.goalState);

        app.scheduler.register(this.schedulable);
        this.$.hillclimberSearch.classList.remove('hide-section');
        this.$.hillclimberTrain.classList.add('hide-section');
      }
    }, {
      key: '_iterateHillclimber',
      value: function _iterateHillclimber() {
        this.currentFitnessValue = this.hillclimber.iterate();
        this.searchMatrix.setModel(this.hillclimber.currentState);
        if (this.currentFitnessValue <= 0) {
          this.goalMatrix.setModel(this.hillclimber.goalState);
        }
      }
    }, {
      key: '_stopHillclimber',
      value: function _stopHillclimber() {
        app.scheduler.deregister(this.schedulable);
        this.searchMatrix.stop();

        this.$.hillclimberSearch.classList.add('hide-section');
        this.$.hillclimberTrain.classList.remove('hide-section');
      }
    }]);

    return HillclimberElement;
  }();

  Polymer(HillclimberElement);

  function buildSchedulable() {
    var _this2 = this;

    return {
      processTick: function processTick(beatNumber, time) {
        var columnData = _this2.searchMatrix.getColumnValueList(beatNumber);
        columnData.forEach(function (matrixElement, index) {
          if (matrixElement) {
            _this2.instrumentList[index].forEach(function (instrument) {
              instrument.play(0, time);
            });
          }
        });

        if (beatNumber === 15) {
          _this2._iterateHillclimber();
        }
      },
      render: function render(beatNumber, lastBeatNumber) {
        _this2.searchMatrix.render(beatNumber, lastBeatNumber, _this2.isReset);

        if (_this2.isReset) {
          _this2.isReset = false;
        }
      },
      start: function start() {
        _this2.isReset = true;
      },
      stop: function stop() {
        _this2.searchMatrix.stop();
      }
    };
  }

  function buildClipManager(matrixList, setActiveIndex) {
    return {
      queueActive: function queueActive(matrixElement) {},
      onMatrixChange: function onMatrixChange(matrixElement, row, column, value) {}
    };
  }

  function buildMultiSelectModel() {
    var _this3 = this;

    return {
      list: [{
        display: 'Train',
        value: 'TRAIN'
      }, {
        display: 'Search',
        value: 'SEARCH'
      }],
      callback: function callback(selectionString) {
        if (selectionString === 'SEARCH') {
          _this3._startHillclimber();
        } else if (selectionString === 'TRAIN') {
          _this3._stopHillclimber();
        }
      }
    };
  }

  var HillclimberDriver = function () {
    function HillclimberDriver(goalStates) {
      _classCallCheck(this, HillclimberDriver);

      this.goalStates = goalStates;
      this._restart();
    }

    _createClass(HillclimberDriver, [{
      key: 'iterate',
      value: function iterate() {
        var fitnessSum = getFitnessSum(this.currentState, this.goalState);
        fitnessSum > 0 ? this._hillclimb() : this._restart();
        return fitnessSum;
      }
    }, {
      key: '_hillclimb',
      value: function _hillclimb() {
        var _this4 = this;

        this.currentState = this.currentState.map(function (currentRow, index) {
          var rowFitness = getRowFitness(currentRow, _this4.goalState[index]);
          if (rowFitness.fitness > 0) {
            currentRow = generateSuccessor(currentRow, rowFitness);
          }
          return currentRow;
        });
      }
    }, {
      key: '_restart',
      value: function _restart() {
        this.goalState = this._getArbitraryGoalState();
        this.currentState = generateRandomState(this.goalState);
      }
    }, {
      key: '_getArbitraryGoalState',
      value: function _getArbitraryGoalState() {
        var goalIndex = Math.floor(this.goalStates.length * Math.random());
        return this.goalStates[goalIndex];
      }
    }]);

    return HillclimberDriver;
  }();

  function generateRandomState(goalState) {
    var randomRestart = goalState.map(function (goalRow) {
      return goalRow.map(function (item) {
        return Math.random() < 0.5 ? true : false;
      });
    });
    return randomRestart;
  }

  function printRows(currentRow, goalRow) {
    var currentString = currentRow.map(function (item) {
      return item ? 1 : 0;
    }).join(',');
    currentString = 'Current: ' + currentString;
    var goalString = goalRow.map(function (item) {
      return item ? 1 : 0;
    }).join(',');
    goalString = 'Goal: ' + goalString;
    console.log(currentString, goalString);
  }

  function getRowFitness(currentRow, goalRow) {
    var fitnessReport = {
      fitness: 0,
      incorrectIndices: []
    };
    return currentRow.reduce(function (report, item, index) {
      if (item !== goalRow[index]) {
        report.fitness++;
        report.incorrectIndices.push(index);
      }
      return report;
    }, fitnessReport);
  }

  function generateSuccessor(currentRow, fitnessReport) {
    var incorrectIndex = Math.floor(fitnessReport.incorrectIndices.length * Math.random());
    var targetIndex = fitnessReport.incorrectIndices[incorrectIndex];
    currentRow[targetIndex] = !currentRow[targetIndex];
    return currentRow;
  }

  function getFitnessSum(currentMatrix, goalMatrix) {
    var fitnessSum = 0;
    for (var i = 0; i < currentMatrix.length; i++) {

      var currentRow = currentMatrix[i];
      var goalRow = goalMatrix[i];
      for (var j = 0; j < currentRow.length; j++) {
        if (currentRow[j] != goalRow[j]) {
          fitnessSum++;
        }
      }
    }
    return fitnessSum;
  }
})();