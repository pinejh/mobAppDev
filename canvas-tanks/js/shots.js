var gravityScale = .098*3/2;
var g = new Vector(0, gravityScale);
var powerScale = .175;

class Shot {
  constructor(angle, power, x, y, options) {
    this.startAngle = rad(angle);
    this.startPower = power;
    this.pos = new Vector(x, y);
    this.vel = new Vector();
    this.acc = new Vector();
    var force = new Vector(Math.cos(this.startAngle), -Math.sin(this.startAngle));
    force.scale(this.startPower * powerScale);
    this.acc.addVector(force);
    this.options = options;
  }
  update() {
    this.vel.addVector(this.acc);
    this.pos.addVector(this.vel);
    this.acc = g;
    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.options.radius, 0, TWOPI, false);
    c.fillStyle = this.options.color;
    c.fill();
    //console.log(Math.floor(this.pos.x) + ', ' + Math.floor(this.pos.y));
  }
  explode() {
    explosions.push(new Explosion(this.pos, this.options));
  }
}

class Explosion {
  constructor(pos, options) {
    console.log("newExplosion");
    this.pos = pos;
    this.remove = false;
    this.options = options;
    this.alpha = 1;
    console.log(this.options);
  }
  update() {
    this.alpha -= 1/59;
    //console.log(this.alpha);
    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.options.explRadius, 0, TWOPI, false);
    c.globalAlpha = this.alpha;
    c.fillStyle = this.options.explColor;
    c.fill();
    if(this.alpha <= 0) this.remove = true;
  }

}
