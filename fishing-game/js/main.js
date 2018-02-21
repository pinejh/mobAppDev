var canvas = document.getElementById('main');
canvas.width = 50;
canvas.height = 450;

var c = canvas.getContext('2d');

var origin = new Vector(12.5, 50);
var player;

var grav = new Vector(0, .25);
var force = new Vector(0, -.55);

var capture = 0;

var fish;
var fishAngle = 0;
var forceScalar = 1;

function init() {
  player = new Particle(origin.x, canvas.height-origin.y);
  player.setGrav(grav);
  fish = new Particle(origin.x, 450-origin.x);
  fish.addForce(0, -Math.floor(Math.random()*3)-4);
  fish.setDrag(.98);
  update();
}

function update() {
  c.clearRect(0, 0, canvas.width, canvas.height);

  if(m1) {
    player.addForce(force);
  }

  player.update();

  if(player.pos.y-origin.y <= 0) {
    player.pos.y = origin.y;
    if(player.vel.y < 0) player.vel.y *= -.25;
  }
  if(player.pos.y+origin.y >= canvas.height) {
    player.pos.y = canvas.height-origin.y;
    if(player.vel.y > 0) player.vel.y *= -.75;
  }

  fishAngle += .1;
  var newForce = Math.random()*forceScalar-(forceScalar/2);
  fish.addForce(new Vector(0, newForce));
  fish.update();

  if(fish.pos.y-origin.x < 0) {
    fish.pos.y = origin.x;
  }
  if(fish.pos.y+origin.x > canvas.height) {
    fish.pos.y = canvas.height-origin.x;
  }

  if(player.pos.dist(fish.pos) < origin.y) {
    capture += .40;
    if(capture >= 100) {
      alert('fish caught')
      capture = 0;
    }
  } else {
    capture -= .35;
    if(capture < 0) capture = 0;
  }

  c.fillStyle = "#0f0";
  c.fillRect(player.pos.x-origin.x, player.pos.y-origin.y, origin.x*2, origin.y*2);
  c.fillRect(25, canvas.height, 25, -canvas.height/100 * capture)

  c.beginPath();
  c.fillStyle = "#f00";
  c.arc(fish.pos.x, fish.pos.y, origin.x, 0, Math.PI*2, false);
  c.fill()

  requestAnimationFrame(update);
}
