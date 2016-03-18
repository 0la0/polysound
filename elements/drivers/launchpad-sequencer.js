'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var LaunchpadSequencer = (function () {
    function LaunchpadSequencer() {
      _classCallCheck(this, LaunchpadSequencer);
    }

    _createClass(LaunchpadSequencer, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'launchpad-sequencer';

        this.properties = {
          instrumentList: {
            type: Array
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
        this.isReset = true;
        this.particles = [];
        this.schedulable = buildSchedulable.call(this);
        app.scheduler.register(this.schedulable);

        this.particles = buildParticles();
        this.launchpad = buildLaunchpad(app.audio.midiDeviceFactory, this.particles);
      }
    }, {
      key: 'detached',
      value: function detached() {
        app.scheduler.deregister(this.schedulable);
        //TODO: close midi connection
      }
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }]);

    return LaunchpadSequencer;
  })();

  Polymer(LaunchpadSequencer);

  //--- js imports ---//
  var midiHelpers = buildMidiHelpers();
  var StatusMap = midiHelpers.StatusMap;
  var getObjectFromMessage = midiHelpers.getObjectFromMessage;
  var getMessageFromObject = midiHelpers.getMessageFromObject;
  var Matrix = importMatrix();
  var launchpadHelpers = importLaunchpadHelpers();
  var ParticleDriver = importParticleDriver();

  var runBehaviors = {
    rotate: importRotateBehavior(Matrix),
    cascade: importCascadeBehavior(Matrix),
    fall: importFallBehavior()
  };

  //TODO: create map of all values
  var Velocity = {
    RED: 15,
    GREEN: 60,
    YELLOW: 62,
    AMBER: 63,
    OFF: 0,
    ON: 127
  };

  function buildOnMidiMessage(launchpad, particleList) {

    var touchList = [];

    return function onmidimessage(event) {
      var message = getObjectFromMessage(event.data);
      //let noteValue = message.note;
      var row = Math.floor(message.note / 16);
      var column = message.note % 16;

      if (launchpadHelpers.eventIsInMatrix(message, row, column)) {

        var messageObject = {
          status: 0,
          note: message.note
        };

        if (message.value === Velocity.ON) {
          touchList.push({ row: row, column: column });

          messageObject.command = StatusMap.NOTE_ON;
          messageObject.value = Velocity.GREEN;
        } else if (message.value === Velocity.OFF) {
          touchList = touchList.filter(function (touchState) {
            return touchState.row !== row && touchState.column !== column;
          });

          messageObject.command = StatusMap.NOTE_OFF;
          messageObject.value = Velocity.OFF;
        }
        //pass callback that can be picked up by render behavior
        particleList.forEach(function (particle) {
          return particle.applyTouchStates(touchList);
        });

        //TODO: for a given render behavior, apply render to both launchpad and viewMatrix
        launchpad.output.send(getMessageFromObject(messageObject));
      } else if (launchpadHelpers.eventIsInTopBar(message, row, column)) {
        //
      } else if (launchpadHelpers.eventIsInSideBar(message, row, column)) {
          if (message.value === 127 && particles[row]) {
            particleList[row].particleModel.changeDirection();
          }
        }
    };
  }

  function buildRenderParticle(launchpad) {

    return function renderParticle(currentParticle, lastParticle, time) {
      var MIDI_OFF = 8;
      var MIDI_ON = 9;

      var noteOn = currentParticle.row * 16 + currentParticle.column;
      var noteOff = lastParticle.row * 16 + lastParticle.column;
      var messageObjectOn = { command: MIDI_ON, status: 0, note: noteOn, value: Velocity.AMBER };
      var messageObjectOff = { command: MIDI_OFF, status: 0, note: noteOff, value: Velocity.OFF };

      launchpad.output.send(getMessageFromObject(messageObjectOn), time);
      launchpad.output.send(getMessageFromObject(messageObjectOff), time);
    };
  }

  function buildLaunchpad(midiDeviceFactory, particles) {
    var launchpad = midiDeviceFactory.getDeviceByName('Launchpad Mini');
    if (!launchpad.input && !launchpad.output) {
      console.warn('Launchpad not connected!');
    }

    if (launchpad.input) {
      launchpad.input.onmidimessage = buildOnMidiMessage(launchpad, particles);
    }
    launchpad.renderParticle = launchpad.output ? buildRenderParticle(launchpad) : function () {};
    return launchpad;
  }

  function buildParticles() {
    var topParticle = new ParticleDriver(0, 0, 8, 2, runBehaviors.rotate);
    var middleParticle = new ParticleDriver(0, 2, 8, 2, runBehaviors.rotate);
    var bottomLeftParticle = new ParticleDriver(0, 4, 4, 4, runBehaviors.rotate);
    var bottomRightParticle = new ParticleDriver(4, 4, 4, 4, runBehaviors.cascade);

    var fall0 = new ParticleDriver(4, 0, 1, 8, runBehaviors.fall);
    var fall1 = new ParticleDriver(5, 0, 1, 8, runBehaviors.fall);
    var fall2 = new ParticleDriver(6, 0, 1, 8, runBehaviors.fall);
    var fall3 = new ParticleDriver(7, 0, 1, 8, runBehaviors.fall);

    return [topParticle, bottomLeftParticle, fall0, fall1, fall2, fall3];
  }

  var TEMP_NOTE_MAP = {
    2: 0,
    3: 5,
    4: 12,
    5: 7
  };

  function buildSchedulable() {
    var _this = this;

    return {
      processTick: function processTick(beatNumber, time) {
        beatNumber = beatNumber % _this.width;

        if (!_this.isReset) {
          _this.particles.forEach(function (particle) {
            return particle.run();
          });
        }
        _this.particles.forEach(function (particle, particleIndex) {

          _this.launchpad.renderParticle(particle.currentValue, particle.lastValue, time, _this.isReset);

          if (particle.play()) {
            (function () {

              var note = TEMP_NOTE_MAP[particleIndex];
              _this.instrumentList.forEach(function (instrumentSet) {
                instrumentSet.forEach(function (instrument) {
                  instrument.play(note, time);
                });
              });
            })();
          }
        });
        if (_this.isReset) {
          _this.isReset = false;
        }
        //TODO: implement instrument logic
        // let columnData = this.viewMatrix.getColumnValueList(beatNumber);
        // columnData.forEach( (matrixElement, index) => {
        //   // if (matrixElement && this.instrumentList) {
        //   //   this.instrumentList[index].forEach((instrument) => {
        //   //     instrument.play(0, time);
        //   //   });
        //   // }
        // });
      },
      render: function render(beatNumber, lastBeatNumber) {},
      start: function start() {
        _this.isReset = true;
      },
      stop: function stop() {
        //this.viewMatrix.stop();
        //TODO: clean launchpad
      }
    };
  }
})();