import Line from './line.js';

export default class ConnectionBus {

  constructor () {
    //this.lineMap = new Map();
    this.currentLine = null;
  }

  // connect (source, destination) {}
  // disconnect (source, destination) {}

  createLine (x, y) {
    this.currentLine = new Line(x, y);
    //console.log('createLine', this.line);
    //this.updateView();
    this.helpers.addActiveLine(this.currentLine);
  }

  moveLine (x, y) {
    this.currentLine.setPoint2(x, y);
    //console.log('move line:', this.line);
    this.helpers.updateActiveLine(this.currentLine);
  }

  finishLine (connectionKey, inputNode, outputNode) {
    this.helpers.finishLine(this.currentLine, connectionKey, inputNode, outputNode);
  }

  destroyLine () {
    this.currentLine = null;
    //this.updateView();
    this.helpers.removeActiveLine(this.currentLine);
  }

  setHelperFunctions (helpers) {
    this.helpers = helpers;
  }

}
