class Player {
  constructor(x, color) {
    this.pos = new Vector(x, canvas.height-groundHeight(x));
    this.origin = new Vector(31/2, 16);
    this.playerColor = color;
    if(this.playerColor == 'green') this.barrelColor = '#0f0';
    else this.barrelColor = '#f00';
    this.img = new Image();
    this.img.src = 'assets/'+this.playerColor+'.png';
    this.angle = groundAngle(x);
    this.sangle = rad(90);
    this.spower = 50;
    this.sweapon = 'Single Shot';
    this.hitbox = new Vector(this.pos.x+Math.sin(this.angle)*this.origin.y*2/7, this.pos.y-Math.cos(this.angle)*this.origin.y*2/7);
    this.hitboxRadius = 13;
    this.health = 300;
  }
  update() {
    if(this.sangle < 0) this.sangle+=TWOPI;
    var dispAngle = Math.round(deg(this.sangle%TWOPI));
    if(dispAngle > 90&& dispAngle < 270) {
      dispAngle = 180-dispAngle;
    } else if (dispAngle >= 270) {
      dispAngle = -360+dispAngle;
    }
    this.hitbox = new Vector(this.pos.x+Math.sin(this.angle)*this.origin.y*2/7, this.pos.y-Math.cos(this.angle)*this.origin.y*2/7);
    c.save();
    c.font = "10px Arial";
    c.textAlign = "center";
    c.shadowColor = "#000";
    c.shadowBlur = 5;
    c.fillStyle = "#ffffff";
    c.fillText(dispAngle+', '+Math.round(this.spower),this.pos.x, this.pos.y+20);
    c.strokeStyle = '#0f0';
    c.lineWidth = 3;
    c.beginPath();
    c.moveTo(this.hitbox.x-12.5, this.hitbox.y-25);
    c.lineTo(this.hitbox.x-12.5+25/300*this.health, this.hitbox.y-25);
    c.stroke();
    c.restore();
    c.beginPath();
    c.moveTo(this.hitbox.x, this.hitbox.y);
    c.lineTo(this.hitbox.x+Math.cos(this.sangle)*18, this.hitbox.y-Math.sin(this.sangle)*18);
    c.lineWidth = 3;
    c.strokeStyle = this.barrelColor;
    c.stroke();
    c.save();
    c.translate(this.pos.x, this.pos.y);
    c.rotate(this.angle);
    c.drawImage(this.img, -this.origin.x, -this.origin.y);
    c.restore();
    /*c.beginPath();
    c.strokeStyle = "#00f";
    c.lineWidth = .5;
    c.arc(this.hitbox.x, this.hitbox.y, this.hitboxRadius, 0, TWOPI, false);
    c.stroke();*/
  }

  move(amt) {
    this.pos.x += amt;
    this.pos.y = canvas.height-groundHeight(this.pos.x);
    this.angle = groundAngle(this.pos.x);
  }

  fire() {
    entities.unshift(new Shot(rad(Math.round(deg(this.sangle))), Math.round(this.spower), this.hitbox.x+Math.cos(this.sangle)*18, this.hitbox.y-Math.sin(this.sangle)*18, getShotType(this.sweapon)));
    nextPlayer();
  }

  damage(amt) {
    this.health -= amt;
    if(this.health<0) this.health = 0;
  }

}
