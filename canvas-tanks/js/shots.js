var gravityScale = .098*3/2;
var g = new Vector(0, gravityScale);
var powerScale = .175;

class Shot {
  constructor(angle, power, x, y, options) {
    this.startAngle = angle;
    this.startPower = power;
    this.pos = new Vector(x, y);
    this.vel = new Vector();
    this.acc = new Vector();
    var force = new Vector(Math.cos(this.startAngle), -Math.sin(this.startAngle));
    force.scale(this.startPower * powerScale);
    this.acc.addVector(force);
    this.options = options;

    if(this.options.trail) this.trail = new Trail(this.options, 15);
  }
  update() {
    this.vel.addVector(this.acc);
    this.pos.addVector(this.vel);
    this.acc = g;

    this.trail.update(this.pos);

    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.options.radius, 0, TWOPI, false);
    c.fillStyle = this.options.color;
    c.fill();
    //console.log(Math.floor(this.pos.x) + ', ' + Math.floor(this.pos.y));
  }
  explode(player) {
    if(this.options.hitPlayer) explosions.push(new Explosion(this.pos, this.options, this.trail, player));
    explosions.push(new Explosion(this.pos, this.options, this.trail));
  }
}

class Explosion {
  constructor(pos, options, trail, player) {
    this.pos = pos;
    this.remove = false;
    this.options = options;
    this.alpha = 1;
    if(this.options.trail) this.trail = trail;
    if(player && this.options.damage != 0) {
      this.player = player;
      this.player.damage(this.options.damage);
    }
    for(var i = players.length-1; i >= 0; i--) {
      if(this.pos.dist(players[i].hitbox) < this.options.explRadius + players[i].hitboxRadius) {
        if(!(this.options.damage == 0 && this.player == players[i])) {
          players[i].damage(this.options.explDamage);
        }
      }
    }
  }
  update() {
    if(this.options.trail && this.trail.pts.length > 0) this.trail.stopTrail();
    c.save();
    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.options.explRadius, 0, TWOPI, false);
    c.globalAlpha = this.alpha;
    c.fillStyle = this.options.explColor;
    c.fill();
    c.restore();

    this.alpha -= 1/59;
    this.alpha.clamp(0, 1);
    if(this.alpha <= 0) this.remove = true;
  }
}

class Trail {
  constructor(options, trailLen) {
    this.options = options;
    this.pts = [];
    this.trailLen = trailLen;
  }
  update(pos) {
    this.pts.unshift(new Vector(pos.x, pos.y));
    if(this.pts.length > this.trailLen) this.pts.splice(this.trailLen-1, this.pts.length);
    this.draw();
  }
  draw() {
    c.save();
    c.beginPath();
    c.moveTo(this.pts[0].x, this.pts[0].y);
    for(var i = 1; i < this.pts.length; i++) {
      c.lineTo(this.pts[i].x, this.pts[i].y);
      c.globalAlpha = .15;
      c.strokeStyle = this.options.trailColor;
      c.lineWidth = this.options.radius*2*((this.pts.length-i)/this.pts.length);
      c.stroke();
      //console.log(this.options.trailColor + ', ' + this.options.radius)
    }
    c.restore();
  }
  stopTrail() {
    this.draw();
    this.pts.splice(this.pts.length-1, 1);
  }
}
