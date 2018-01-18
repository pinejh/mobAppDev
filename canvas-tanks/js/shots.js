var gravityScale = .098*3/2;
var g = new Vector(0, gravityScale);
var powerScale = .175;

class Shot {
  constructor(angle, power, x, y) {
    this.startAngle = rad(angle);
    this.startPower = power;
    this.pos = new Vector(x, y);
    this.vel = new Vector();
    this.acc = new Vector();
    var force = new Vector(Math.cos(this.startAngle), -Math.sin(this.startAngle));
    force.scale(this.startPower * powerScale);
    this.acc.addVector(force);
  }
  update() {
    this.vel.addVector(this.acc);
    this.pos.addVector(this.vel);
    this.acc = g;
    c.beginPath();
    c.arc(this.pos.x, this.pos.y, 5, 0, 2*Math.PI, false);
    c.fill();
    //console.log(Math.floor(this.pos.x) + ', ' + Math.floor(this.pos.y));
  }
}
