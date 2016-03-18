"use strict";

function importRemovable(model) {
  var _this = this;

  return {
    callback: function callback() {
      _this.connectionInput.helpers.removeElement(model.input);
      _this.connectionOutput.helpers.removeElement(model.getOutput());
      Polymer.dom(_this).parentNode.removeChild(_this);
    }
  };
};