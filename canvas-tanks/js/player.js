class Player {
  constructor(pos, color) {
    this.pos = pos;
    this.origin = new Vector(31/2, 16);
    this.playerColor = color;
    if(this.playerColor == 'green') this.barrelColor = '#0f0';
    else this.barrelColor = '#f00';
    this.img = new Image();
    this.img.src = 'assets/'+this.playerColor+'.png';
    this.angle = 0;
    this.sangle = rad(90);
    this.spower = 50;
    this.sweapon = 'Single Shot';
  }
  update() {
    c.beginPath();
    c.moveTo(this.pos.x, this.pos.y-this.origin.y/2);
    c.lineTo(this.pos.x+Math.cos(this.sangle)*18, this.pos.y-this.origin.y/2-Math.sin(this.sangle)*18);
    c.lineWidth = 3;
    c.strokeStyle = this.barrelColor;
    c.stroke();
    c.save();
    c.translate(this.pos.x, this.pos.y);
    c.rotate(this.angle);
    c.drawImage(this.img, -this.origin.x, -this.origin.y);
    c.restore();
  }

  fire() {
    entities.unshift(new Shot(this.sangle, this.spower, this.pos.x, this.pos.y-this.origin.y/2, getShotType(this.sweapon)));
    nextPlayer();
  }
}
