'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var ConnectorBus = function () {
    function ConnectorBus() {
      _classCallCheck(this, ConnectorBus);
    }

    _createClass(ConnectorBus, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'connector-bus';

        this.properties = {
          busModel: {
            type: Object
          }
        };

        this.listeners = {
          down: '_handleClick'
        };
      }
    }, {
      key: 'ready',
      value: function ready() {}
    }, {
      key: 'attached',
      value: function attached() {
        var _this = this;

        this.svgElement = this.$$('svg');
        this.busModel.setHelperFunctions(this._viewModelHelpers());
        this.lineMap = new Map();
        setTimeout(function () {
          _this.boundingClientRect = _this.getBoundingClientRect();
        }, 0);
      }
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }, {
      key: '_viewModelHelpers',
      value: function _viewModelHelpers() {
        var _this2 = this;

        return {
          addActiveLine: function addActiveLine(line) {
            var activeLine = _this2._createTemporaryLine(line);

            _this2.activeLine = activeLine;
            Polymer.dom(_this2.svgElement).appendChild(_this2.activeLine.point1);
            Polymer.dom(_this2.svgElement).appendChild(_this2.activeLine.point2);
            Polymer.dom(_this2.svgElement).appendChild(_this2.activeLine.line);
          },
          updateActiveLine: function updateActiveLine(line) {
            if (!line) {
              return;
            }
            var xBuffer = _this2.boundingClientRect.left;
            var yBuffer = _this2.boundingClientRect.top;
            setLinePosition(_this2.activeLine, line.p1.x, line.p1.y, line.p2.x, line.p2.y, xBuffer, yBuffer);
          },
          removeActiveLine: function removeActiveLine(line) {
            removeLine(_this2.svgElement, _this2.activeLine);
            _this2.activeLine = null;
          },
          finishLine: function finishLine(line, connectionKey, inputNode, outputNode, connectorInput, connectorOutput) {
            if (_this2.lineMap.has(connectionKey)) {
              app.$.toast.text = 'Connection already exists.';
              app.$.toast.show();
              removeLine(_this2.svgElement, _this2.activeLine);
            } else {
              _this2.activeLine.connectionKey = connectionKey;
              _this2.activeLine.inputNode = inputNode;
              _this2.activeLine.outputNode = outputNode;
              _this2.activeLine.connectorInput = connectorInput;
              _this2.activeLine.connectorOutput = connectorOutput;

              _this2.lineMap.set(connectionKey, _this2.activeLine);
              _this2.activeLine.point1.setAttributeNS(null, 'r', 0);
              _this2.activeLine.point2.setAttributeNS(null, 'r', 0);
            }
            _this2.activeLine = null;
          },
          removeElement: function removeElement(nodeToRemove) {
            var hasLineToRemove = false;
            _this2.activeLine = null;
            _this2.lineMap.forEach(function (value, key) {

              //remove effect : effect and effect : instrument
              if (value.inputNode === nodeToRemove || value.outputNode === nodeToRemove) {
                try {
                  value.inputNode.disconnect(value.outputNode);
                } catch (err) {}

                Polymer.dom(_this2.svgElement).removeChild(value.line);
                _this2.lineMap.delete(key);
                hasLineToRemove = true;
              }
              //remove instrument : driver
              else if (value.inputNode && value.inputNode.hasInstrumentSet) {
                  (function () {
                    var instrumentSet = value.inputNode.getInstrumentSet();

                    instrumentSet.forEach(function (instrument) {
                      if (instrument.input === nodeToRemove) {
                        instrument.output.disconnect(value.outputNode);
                        Polymer.dom(_this2.svgElement).removeChild(value.line);
                        _this2.lineMap.delete(key);
                        hasLineToRemove = true;

                        instrumentSet.delete(instrument);
                      }
                    });
                  })();
                }
            });

            if (hasLineToRemove) {
              setTimeout(function () {
                _this2.lineMap.forEach(function (value, key) {
                  var inputPosition = value.connectorInput.getPosition();
                  var outputPosition = value.connectorOutput.getPosition();
                  var xBuffer = _this2.boundingClientRect.left;
                  var yBuffer = _this2.boundingClientRect.top;

                  setLinePosition(value, inputPosition.x, inputPosition.y, outputPosition.x, outputPosition.y, xBuffer, yBuffer);
                });
              }, 0);
            }
          }
        };
      }
    }, {
      key: '_createTemporaryLine',
      value: function _createTemporaryLine(line) {
        var xBuffer = this.boundingClientRect.left;
        var yBuffer = this.boundingClientRect.top;
        var svgNS = 'http://www.w3.org/2000/svg';

        var point1 = document.createElementNS(svgNS, 'circle');
        point1.setAttributeNS(null, 'cx', line.p1.x - xBuffer);
        point1.setAttributeNS(null, 'cy', line.p1.y - yBuffer);
        point1.setAttributeNS(null, 'r', 3);
        point1.setAttributeNS(null, 'fill', 'black');
        point1.setAttributeNS(null, 'stroke', 'none');

        var point2 = document.createElementNS(svgNS, 'circle');
        point2.setAttributeNS(null, 'cx', line.p2.x - xBuffer);
        point2.setAttributeNS(null, 'cy', line.p2.y - yBuffer);
        point2.setAttributeNS(null, 'r', 3);
        point2.setAttributeNS(null, 'fill', 'black');
        point2.setAttributeNS(null, 'stroke', 'none');

        var lineElement = document.createElementNS(svgNS, 'line');
        lineElement.setAttributeNS(null, 'x1', line.p1.x - xBuffer);
        lineElement.setAttributeNS(null, 'y1', line.p1.y - yBuffer);
        lineElement.setAttributeNS(null, 'x2', line.p2.x - xBuffer);
        lineElement.setAttributeNS(null, 'y2', line.p2.y - yBuffer);
        lineElement.setAttributeNS(null, 'stroke', 'black');
        lineElement.setAttributeNS(null, 'stroke-width', '3');
        lineElement.addEventListener('click', this._lineClick.bind(this), false);

        return {
          point1: point1,
          point2: point2,
          line: lineElement
        };
      }
    }, {
      key: '_lineClick',
      value: function _lineClick(event) {
        if (!this.activeLine) {
          var targetLine = event.target;
          var targetValue;
          this.lineMap.forEach(function (value, key) {
            if (value.line === targetLine) {
              targetValue = value;
            }
          });
          targetValue.point1.setAttributeNS(null, 'r', 5);
          targetValue.point2.setAttributeNS(null, 'r', 5);
          this.activeLine = targetValue;
        } else {
          //remove line and connections
          var activeKey = this.activeLine.connectionKey;
          removeLine(this.svgElement, this.activeLine);
          this.activeLine.inputNode.disconnect(this.activeLine.outputNode);
          this.activeLine = null;
          this.lineMap.delete(activeKey);
        }
      }
    }, {
      key: '_handleClick',
      value: function _handleClick(event) {
        if (event.srcElement.tagName === 'svg' && this.activeLine) {
          this.activeLine.point1.setAttributeNS(null, 'r', 0);
          this.activeLine.point2.setAttributeNS(null, 'r', 0);
          this.activeLine = null;
        }
      }
    }]);

    return ConnectorBus;
  }();

  function removeLine(parentElement, activeLine) {
    Polymer.dom(parentElement).removeChild(activeLine.point1);
    Polymer.dom(parentElement).removeChild(activeLine.point2);
    Polymer.dom(parentElement).removeChild(activeLine.line);
  }

  function setLinePosition(lineObj, x1, y1, x2, y2, xBuffer, yBuffer) {
    lineObj.point1.setAttribute('cx', x1 - xBuffer);
    lineObj.point1.setAttribute('cy', y1 - yBuffer);

    lineObj.point2.setAttribute('cx', x2 - xBuffer);
    lineObj.point2.setAttribute('cy', y2 - yBuffer);

    lineObj.line.setAttribute('x1', x1 - xBuffer);
    lineObj.line.setAttribute('y1', y1 - yBuffer);

    lineObj.line.setAttribute('x2', x2 - xBuffer);
    lineObj.line.setAttribute('y2', y2 - yBuffer);
  }

  Polymer(ConnectorBus);
})();