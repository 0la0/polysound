"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function importMtof() {
  var Converter = function () {
    function Converter() {
      _classCallCheck(this, Converter);
    }

    _createClass(Converter, null, [{
      key: "getFrequency",
      value: function getFrequency(midiNote) {
        return 440 * Math.pow(2, (midiNote - 69) / 12);
      }
    }, {
      key: "getMidiNote",
      value: function getMidiNote(frequency) {
        return 12 * Math.log2(frequency / 440) + 69;
      }
    }]);

    return Converter;
  }();

  return Converter;
};