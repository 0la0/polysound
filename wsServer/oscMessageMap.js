
const oscMessageMap = {
  '/grainulator/position': {
    type: 'MESSAGE',
    status: 0,
    note: 0
  },
  '/grainulator/spread': {
    type: 'MESSAGE',
    status: 0,
    note: 1
  },
  '/grainulator/timeScatter': {
    type: 'MESSAGE',
    status: 0,
    note: 2
  },
  '/grainulator/voices': {
    type: 'MESSAGE',
    status: 0,
    note: 3
  },
  '/grainulator/thresh': {
    type: 'MESSAGE',
    status: 0,
    note: 4
  },
  '/sampler/attack': {
    type: 'MESSAGE',
    status: 0,
    note: 5
  },
  '/sampler/sustain': {
    type: 'MESSAGE',
    status: 0,
    note: 6
  },
  '/sampler/release': {
    type: 'MESSAGE',
    status: 0,
    note: 7
  },
  '/grainulator/loopTime': {
    type: 'MESSAGE',
    status: 0,
    note: 8
  }
};

module.exports = oscMessageMap;
