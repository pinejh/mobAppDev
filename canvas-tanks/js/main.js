var canvas = document.querySelector('canvas');
canvas.width = 640;
canvas.height = 480;

var c = canvas.getContext('2d');

var players = [];
var entities = [];
var explosions = [];

var currPlayerIndex = 0;
var currYOff = 0;
var currYOffDir = 1;

function init() {
  initBackground();
  players.push(new Player(canvas.width/8, 'green'));
  players.push(new Player(canvas.width*7/8, 'red'));
  currPlayer = players[currPlayerIndex];
  update();
}

function update() {
  c.clearRect(0, 0, canvas.width, canvas.height);

  handleKeys();

  drawBackground();

  for (var i = entities.length-1; i >= 0; i--) {
    entities[i].update();
    if(entities[i].pos.x > canvas.width) entities.splice(i, 1);
    else if(entities[i].pos.y > canvas.height || entities[i].pos.y > canvas.height - groundHeight(entities[i].pos.x)) {
      entities[i].pos.addVector(new Vector(-entities[i].vel.x/3, -entities[i].vel.y/3));
      entities[i].explode();
      entities.splice(i, 1);
    }
  }
  for (var i = players.length-1; i >= 0; i--) {
    players[i].update();
  }
  if (currYOff <= 0) currYOffDir = 1;
  else if (currYOff >= 10) currYOffDir = -1;
  currYOff += currYOffDir*.2;
  c.save();
  c.beginPath();
  c.moveTo(currPlayer.pos.x, currPlayer.pos.y-40-currYOff);
  c.lineTo(currPlayer.pos.x-6, currPlayer.pos.y-47-currYOff);
  c.lineTo(currPlayer.pos.x+6, currPlayer.pos.y-47-currYOff);
  c.fillStyle = "#44a8ff";
  c.shadowColor = "#44a8ff";
  c.shadowBlur = 10;
  c.closePath();
  c.fill();
  c.restore();
  for (var i = explosions.length-1; i >= 0; i--) {
    explosions[i].update();
    if(explosions[i].remove) explosions.splice(i, 1);
  }

  requestAnimationFrame(update);
}

function nextPlayer() {
  currPlayerIndex++;
  if(currPlayerIndex >= players.length) currPlayerIndex = 0;
  currPlayer = players[currPlayerIndex];
  updateWeapon();
}
