var canvas = document.getElementById('main');
canvas.width = 50;
canvas.height = 450;

var c = canvas.getContext('2d');

var origin = new Vector(12.5, 50);
var pos = new Vector(origin.x, canvas.height-origin.y);
var vel = new Vector();
var acc = new Vector();

var grav = new Vector(0, .25);
var force = new Vector(0, -.55);

var capture = 0;

var fish = new Vector(origin.x, 450/2);
var fishAngle = -Math.PI;

function update() {
  c.clearRect(0, 0, canvas.width, canvas.height);

  if(m1) {
    acc.addVector(force);
  }

  vel.addVector(acc);
  pos.addVector(vel);
  acc.scale(0);
  acc.addVector(grav);

  if(pos.y-origin.y <= 0) {
    pos.y = origin.y;
    if(vel.y < 0) vel.y *= -.25;
  }
  if(pos.y+origin.y >= canvas.height) {
    pos.y = canvas.height-origin.y;
    if(vel.y > 0) vel.y *= -.75;
  }

  fishAngle += .1;
  fish.y = (450/2-origin.x)*Math.cos(fishAngle/(Math.PI*2))+(450/2-origin.x)+origin.x;

  if(pos.dist(fish) < origin.y) {
    capture += .45;
    if(capture >= 100) {
      alert('fish caught')
      capture = 0;
    }
  } else {
    capture -= .375;
    if(capture < 0) capture = 0;
  }

  c.fillStyle = "#0f0";
  c.fillRect(pos.x-origin.x, pos.y-origin.y, origin.x*2, origin.y*2);
  c.fillRect(25, canvas.height, 25, -canvas.height/100 * capture)

  c.beginPath();
  c.fillStyle = "#f00";
  c.arc(fish.x, fish.y, origin.x, 0, Math.PI*2, false);
  c.fill()

  requestAnimationFrame(update);
}
