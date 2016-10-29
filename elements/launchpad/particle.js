"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function importParticle() {

  var Matrix = importMatrix();

  var Particle = function () {
    function Particle(x, y, width, height, runBehavior) {
      _classCallCheck(this, Particle);

      this.rowIndex = 0;
      this.columnIndex = 0;
      this.rotateCnt = 0;
      this.runCnt = 0;
      this.setMatrix(x, y, width, height);
      this.setRunBehavior(runBehavior);
    }

    _createClass(Particle, [{
      key: "changeDirection",
      value: function changeDirection() {
        this.matrix = Matrix.reflectY(this.matrix);
      }
    }, {
      key: "getCurrentState",
      value: function getCurrentState() {
        return this.matrix[this.rowIndex][this.columnIndex];
      }
    }, {
      key: "setMatrix",
      value: function setMatrix(x, y, width, height) {
        this.matrix = Matrix.create(x, y, width, height);
      }
    }, {
      key: "rotate",
      value: function rotate(isClockwise) {
        this.matrix = isClockwise ? Matrix.rotateClockwise(this.matrix) : Matrix.rotateCounterClockwise(this.matrix);
      }
    }, {
      key: "setRunBehavior",
      value: function setRunBehavior(runBehavior) {
        this.runBehavior = runBehavior;
        this.runBehavior.init.call(this);
      }
    }, {
      key: "run",
      value: function run() {
        return this.runBehavior.run.call(this);
      }
    }, {
      key: "processTouch",
      value: function processTouch(events, x, y, width, height) {
        return this.runBehavior.touch.apply(this, arguments);
      }
    }, {
      key: "processRender",
      value: function processRender() {
        return this.runBehavior.render.call(this);
      }
    }, {
      key: "processPlay",
      value: function processPlay() {
        return this.runBehavior.play.call(this);
      }
    }]);

    return Particle;
  }();

  return Particle;
};