"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function importParticleDriver() {

  var Particle = importParticle();

  function getActiveTouchStates(touchStates, x, y, width, height) {
    return touchStates.filter(function (touchState) {
      var xIsInBounds = touchState.column >= x && touchState.column <= x + width;
      var yIsInBounds = touchState.row >= y && touchState.row <= y + height;
      return xIsInBounds && yIsInBounds;
    });
  }

  /**
    * A particle driver has a particle and manages its state
    **/

  var ParticleDriver = (function () {
    function ParticleDriver(x, y, width, height, runBehavior) {
      _classCallCheck(this, ParticleDriver);

      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;

      this.particleModel = new Particle(x, y, width, height, runBehavior);
      this.currentValue = this.particleModel.getCurrentState();
      this.lastValue = this.currentValue;
    }

    _createClass(ParticleDriver, [{
      key: "run",
      value: function run() {
        this.lastValue = this.currentValue;
        this.currentValue = this.particleModel.run();
        return this.currentValue;
      }
    }, {
      key: "applyTouchStates",
      value: function applyTouchStates(touchStates) {
        var activeTouchStates = getActiveTouchStates(touchStates, this.x, this.y, this.width, this.height);
        this.particleModel.processTouch(activeTouchStates);
        this.particleModel.processRender(activeTouchStates);
      }
    }, {
      key: "play",
      value: function play() {
        return this.particleModel.processPlay();
      }
    }]);

    return ParticleDriver;
  })();

  return ParticleDriver;
};