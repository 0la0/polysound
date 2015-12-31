import Point from './point.js';

export default class Line {

  constructor (x, y) {
    this.p1 = new Point(x, y);
    this.p2 = new Point(x, y);
  }

  setPoint1 (x, y) {
    this.p1.x = x;
    this.p1.y = y;
  }

  setPoint2 (x, y) {
    this.p2.x = x;
    this.p2.y = y;
  }


}
