Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
}
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
var TWOPI = Math.PI*2;

class Vector {
  constructor(x, y) {
    if(x == undefined || y == undefined) {
      this.x = 0;
      this.y = 0;
    } else {
      this.x = x;
      this.y = y;
    }
  }
  dist(other) {
    return Math.sqrt(Math.pow(this.x-other.x, 2) + Math.pow(this.y-other.y, 2));
  }
  addVector(other) {
    this.x += other.x;
    this.y += other.y;
  }
  scale(scalar) {
    this.x *= scalar;
    this.y *= scalar;
  }
  toString() {
    return this.x +", "+ this.y;
  }
}

function rad(num) { return num * Math.PI / 180; }
function deg(num) { return num / Math.PI * 180; }
