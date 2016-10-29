'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var SequencerMatrix = function () {
    function SequencerMatrix() {
      _classCallCheck(this, SequencerMatrix);
    }

    _createClass(SequencerMatrix, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'sequencer-matrix';

        this.properties = {
          numberOfSteps: {
            type: Number,
            value: 16
          },
          removable: {
            type: Object
          },
          numberOfRows: {
            type: Number,
            value: 5
          },
          clipManager: {
            type: Object
          },
          clipLabel: {
            type: String,
            value: 'Sequencer Clip'
          }
        };

        this.listeners = {
          'down': '_onDown'
        };
      }
    }, {
      key: 'ready',
      value: function ready() {}
    }, {
      key: 'attached',
      value: function attached() {
        this.sequencerHeader = this.$.sequencerHeader;
        this.sequencerBody = this.$.sequencerBody;

        this.sequencerMatrix = buildModelMatrix(this.numberOfRows, this.numberOfSteps);
        this.headerElementList = buildHeader(this.numberOfSteps, this.sequencerHeader);
        this.bodyElementMatrix = buildBody(this.numberOfRows, this.numberOfSteps, this.sequencerBody);

        this.triggerButtonModel = buildTriggerButtonModel.call(this);
        this.expandableButtonModel = buildExpandableButtonModel.call(this);
      }
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }, {
      key: '_onDown',
      value: function _onDown(event) {
        var matrixElement = {
          hasSolution: false,
          rowIndex: null,
          columnIndex: null
        };

        this.bodyElementMatrix.forEach(function (row, index) {
          var tapIndex = row.indexOf(event.srcElement);
          if (tapIndex >= 0) {
            matrixElement.rowIndex = index;
            matrixElement.columnIndex = tapIndex;
            matrixElement.hasSolution = true;
          }
        });

        if (!matrixElement.hasSolution) {
          return;
        }

        var row = matrixElement.rowIndex;
        var column = matrixElement.columnIndex;
        this.setValue(row, column);
        if (this.clipManager) {
          this.clipManager.onMatrixChange(this, row, column, this.sequencerMatrix[row][column]);
        }
      }
    }, {
      key: 'getColumnValueList',
      value: function getColumnValueList(beatNumber) {
        return this.sequencerMatrix.map(function (row) {
          return row[beatNumber];
        });
      }
    }, {
      key: 'render',
      value: function render(beatNumber, lastBeatNumber, isReset) {
        this.headerElementList[beatNumber].classList.toggle('sequencer-row__header-element--active');
        if (!isReset) {
          this.headerElementList[lastBeatNumber].classList.toggle('sequencer-row__header-element--active');
        }

        this.bodyElementMatrix.forEach(function (elementRow) {
          elementRow[beatNumber].classList.toggle('sequencer-row__body-element--active');
          if (!isReset) {
            elementRow[lastBeatNumber].classList.toggle('sequencer-row__body-element--active');
          }
        });
      }
    }, {
      key: 'renderCell',
      value: function renderCell(current, last, isReset) {
        this.bodyElementMatrix[current.row][current.column].classList.toggle('sequencer-row__body-element--active');
        if (!isReset) {
          this.bodyElementMatrix[last.row][last.column].classList.toggle('sequencer-row__body-element--active');
        }
      }
    }, {
      key: 'stop',
      value: function stop() {
        this.headerElementList.forEach(function (headerElement) {
          headerElement.classList.remove('sequencer-row__header-element--active');
        });
        this.bodyElementMatrix.forEach(function (elementRow) {
          elementRow.forEach(function (element) {
            return element.classList.remove('sequencer-row__body-element--active');
          });
        });
      }
    }, {
      key: 'setAsInactive',
      value: function setAsInactive() {
        this.$.sequencerTrigger.setValue(false);
      }
    }, {
      key: 'setAsActive',
      value: function setAsActive() {
        this.$.sequencerTrigger.setValue(true);
      }
    }, {
      key: 'setValue',
      value: function setValue(row, column) {
        this.sequencerMatrix[row][column] = !this.sequencerMatrix[row][column];
        this.sequencerMatrix[row][column] ? this.bodyElementMatrix[row][column].classList.add('sequencer-row__body-element--scheduled') : this.bodyElementMatrix[row][column].classList.remove('sequencer-row__body-element--scheduled');
      }
    }, {
      key: 'getValue',
      value: function getValue(row, column) {
        return this.sequencerMatrix[row][column];
      }
    }, {
      key: 'getModel',
      value: function getModel() {
        return this.sequencerMatrix;
      }
    }, {
      key: 'setModel',
      value: function setModel(sequencerMatrix) {
        this.set('sequencerMatrix');
        this.sequencerMatrix = sequencerMatrix;
        this.renderMatrix();
      }
    }, {
      key: 'renderMatrix',
      value: function renderMatrix() {
        var _this = this;

        this.sequencerMatrix.forEach(function (row, rowIndex) {
          row.forEach(function (element, columnIndex) {
            element ? _this.bodyElementMatrix[rowIndex][columnIndex].classList.add('sequencer-row__body-element--scheduled') : _this.bodyElementMatrix[rowIndex][columnIndex].classList.remove('sequencer-row__body-element--scheduled');
          });
        });
      }
    }]);

    return SequencerMatrix;
  }();

  Polymer(SequencerMatrix);

  function buildElementRow(numberOfSteps, cssClassList) {
    var rowElements = [];
    var rowContainer = document.createElement('div');
    rowContainer.classList.add('sequencer-row');

    var _loop = function _loop(i) {
      var divElement = document.createElement('div');
      cssClassList.forEach(function (cssClass) {
        return divElement.classList.add(cssClass);
      });
      rowElements.push(divElement);
      rowContainer.appendChild(divElement);
    };

    for (var i = 0; i < numberOfSteps; i++) {
      _loop(i);
    }

    return {
      rowContainer: rowContainer,
      elementRow: rowElements
    };
  }

  function buildModelMatrix(numRows, numColumns) {
    var matrix = [];
    for (var i = 0; i < numRows; i++) {
      matrix.push(Array(numColumns).fill(false));
    }
    return matrix;
  }

  function buildHeader(numberOfSteps, headerContainer) {
    var headerClassList = ['sequencer-row__element', 'sequencer-row__header-element'];
    var header = buildElementRow(numberOfSteps, headerClassList);
    Polymer.dom(headerContainer).appendChild(header.rowContainer);
    return header.elementRow;
  }

  function buildBody(numberOfRows, numberOfSteps, bodyContainer) {
    var bodyElementMatrix = [];
    for (var i = 0; i < numberOfRows; i++) {
      var bodyClassList = ['sequencer-row__element', 'sequencer-row__body-element'];
      var body = buildElementRow(numberOfSteps, bodyClassList);
      var bodyElementList = body.elementRow;
      Polymer.dom(bodyContainer).appendChild(body.rowContainer);
      bodyElementMatrix.push(bodyElementList);
    }
    return bodyElementMatrix;
  }

  function buildTriggerButtonModel() {
    var _this2 = this;

    return {
      callback: function callback(isOn) {
        if (isOn && _this2.clipManager) {
          _this2.clipManager.queueActive(_this2);
        }
      }
    };
  }

  function buildExpandableButtonModel() {
    var _this3 = this;

    return {
      callback: function callback(isOn) {
        isOn ? _this3.sequencerBody.classList.add('sequencer-body--collapsed') : _this3.sequencerBody.classList.remove('sequencer-body--collapsed');
      }
    };
  }
})();