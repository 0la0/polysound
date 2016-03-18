'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
  * Matrix helper functions
  **/
function importMatrix() {
  var Matrix = (function () {
    function Matrix() {
      _classCallCheck(this, Matrix);
    }

    _createClass(Matrix, null, [{
      key: 'create',
      value: function create(x, y, width, height) {
        return Array(height).fill(Array(width).fill(null)).map(function (row, rowIndex) {
          return row.map(function (column, columnIndex) {
            return {
              row: rowIndex + y,
              column: columnIndex + x
            };
          });
        });
      }
    }, {
      key: 'transpose',
      value: function transpose(matrix) {
        return matrix[0].map(function (topRowElement, index) {
          //for each row index
          return matrix.map(function (row) {
            //return the corresponding column
            return row[index];
          });
        });
      }
    }, {
      key: 'rotateClockwise',
      value: function rotateClockwise(matrix) {
        return Matrix.transpose(matrix).map(function (row) {
          return row.reverse();
        });
      }
    }, {
      key: 'rotateCounterClockwise',
      value: function rotateCounterClockwise(matrix) {
        return Matrix.transpose(matrix).reverse();
      }
    }, {
      key: 'rotate180',
      value: function rotate180(matrix) {
        var rotate90 = Matrix.rotateClockwise(matrix);
        return Matrix.rotateClockwise(rotate90);
      }
    }, {
      key: 'shiftUp',
      value: function shiftUp(matrix) {
        matrix.push(matrix.shift());
        return matrix;
      }
    }, {
      key: 'shiftDown',
      value: function shiftDown(matrix) {
        matrix.unshift(matrix.pop());
        return matrix;
      }
    }, {
      key: 'reflectY',
      value: function reflectY(matrix) {
        return matrix.map(function (row) {
          return row.reverse();
        });
      }
    }, {
      key: 'reflectX',
      value: function reflectX(matrix) {
        return matrix.reverse();
      }
    }, {
      key: 'print',
      value: function print(matrix) {
        var printString = matrix.map(function (row) {
          return row.map(function (element) {
            return ' * ' + element.row + ', ' + element.column;
          });
        }).join('\n');
        console.log(printString);
      }
    }]);

    return Matrix;
  })();

  return Matrix;
};