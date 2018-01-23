var canvas = document.querySelector('canvas');
canvas.width = 640;
canvas.height = 480;

var c = canvas.getContext('2d');

var players = [];
var entities = [];
var explosions = [];

var currPlayerIndex = 0;

function init() {
  players.push(new Player(new Vector(canvas.width/8, canvas.height*7/8), 'green'));
  players.push(new Player(new Vector(canvas.width*7/8, canvas.height*7/8), 'red'));
  currPlayer = players[currPlayerIndex];
  update();
}

function update() {
  c.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = entities.length-1; i >= 0; i--) {
    entities[i].update();
    if(entities[i].pos.x > canvas.width) entities.splice(i, 1);
    else if(entities[i].pos.y > canvas.height) {
      entities[i].explode();
      entities.splice(i, 1);
    }
  }
  for (var i = players.length-1; i >= 0; i--) {
    players[i].update();
  }
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
}
