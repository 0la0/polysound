import Line from './line.js';

export default class ConnectionBus {

  constructor () {
    this.currentLine = null;
  }

  createLine (x, y) {
    this.currentLine = new Line(x, y);
    this.helpers.addActiveLine(this.currentLine);
  }

  moveLine (x, y) {
    this.currentLine.setPoint2(x, y);
    this.helpers.updateActiveLine(this.currentLine);
  }

  finishLine (connectionKey, inputNode, outputNode) {
    this.helpers.finishLine(this.currentLine, connectionKey, inputNode, outputNode);
  }

  destroyLine () {
    this.currentLine = null;
    this.helpers.removeActiveLine(this.currentLine);
  }

  setHelperFunctions (helpers) {
    this.helpers = helpers;
  }

}
