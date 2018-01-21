class Player {
  constructor(pos, color) {
    this.pos = pos;
    this.origin = new Vector(31/2, 16);
    this.playerColor = color;
    this.img = new Image();
    this.img.src = 'assets/'+this.playerColor+'.png';
    this.angle = -0;
  }
  update() {
    c.save();
    c.translate(this.pos.x, this.pos.y);
    c.rotate(this.angle);
    c.drawImage(this.img, -this.origin.x, -this.origin.y);
    c.restore();
  }
}
