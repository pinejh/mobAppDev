function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

const DRAG_SPHERE = .47;
const DRAG_CUBE = 1.05;
const DRAG_STREAMLINED = .04

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

class Particle {
  constructor(x, y) {
    if(x == undefined || y == undefined) {
      this.pos = new Vector();
    } else {
      this.pos = new Vector(x, y);
    }
    this.vel = new Vector();
    this.acc = new Vector();
    this.grav = new Vector();
    this.dragCoeff = DRAG_STREAMLINED;
    this.drag = 1;
  }
  update() {
      this.vel.addVector(this.acc);
      this.pos.addVector(this.vel);
      this.acc.scale(0);
      this.acc.addVector(this.grav);
      this.vel.scale(this.drag);
      //this.addForce(new Vector(-this.vel.x*this.friction, -this.vel.y*this.friction));
  }
  setPos(x, y) {
    if(y == undefined && x instanceof Vector) {
      this.pos.x = x.x;
      this.pos.y = x.y;
    } else {
      this.pos.x = x;
      this.pos.y = y;
    }
  }
  setGrav(x, y) {
    if(y == undefined && x instanceof Vector) {
      this.grav.x = x.x;
      this.grav.y = x.y;
    } else {
      this.grav.x = x;
      this.grav.y = y;
    }
  }
  setDrag(d) {
    this.drag = d;
  }
  addForce(x, y) {
    if(y == undefined && x instanceof Vector) this.acc.addVector(x);
    else this.acc.addVector(new Vector(x, y));
  }
}
