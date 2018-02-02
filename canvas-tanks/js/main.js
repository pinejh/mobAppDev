var canvas = document.querySelector('canvas');
canvas.width = 640;
canvas.height = 480;

var c = canvas.getContext('2d');

var paused = false;

var players = [];
var deadPlayers = [];
var entities = [];
var explosions = [];
var dmgindics = [];

var currPlayerIndex = 0;
var currYOff = 0;
var currYOffDir = 1;

function init() {
  initBackground();
  players.push(new Player(canvas.width/8, 'green'));
  players.push(new Player(canvas.width*7/8, 'red'));
  currPlayer = players[currPlayerIndex];
  initShots();
  update();
}

function update() {
  c.clearRect(0, 0, canvas.width, canvas.height);

  if(!paused) handleKeys();

  drawBackground();

  for (var i = entities.length-1; i >= 0; i--) {
    entities[i].update();
    if(entities[i].pos.x > canvas.width) entities.splice(i, 1);
    else if(entities[i].pos.y > canvas.height || entities[i].pos.y > canvas.height - groundHeight(entities[i].pos.x)) {
      entities[i].pos.addVector(new Vector(-entities[i].vel.x/3, -entities[i].vel.y/3));
      entities[i].explode();
      entities.splice(i, 1);
    } else if(entities[i].options.hitPlayer) {
      plist: for(p of players) {
        if (entities[i].pos.dist(p.hitbox) < p.hitboxRadius) {
          entities[i].explode(p);
          entities.splice(i, 1);
          break plist;
        }
      }
    }
  }
  for (p of deadPlayers) {
    p.update();
  }
  for (var i = players.length-1; i >= 0; i--) {
    players[i].update();
    if(!players[i].alive) {
      deadPlayers.push(new dPlayer(players[i].pos, players[i].origin, players[i].angle));
      players.splice(i, i+1);
    }
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
  for(var i = dmgindics.length-1; i >= 0; i--) {
    dmgindics[i].update();
    if(dmgindics[i].remove) dmgindics.splice(i, 1);
  }
  for (var i = explosions.length-1; i >= 0; i--) {
    explosions[i].update();
    if(explosions[i].remove) {
      explosions.splice(i, 1);
      if(explosions.length == 0) nextPlayer();
    }
  }

  requestAnimationFrame(update);
}

function pauseForNext() {
  paused = true;
}
function nextPlayer() {
  if(players.length > 1) {
    paused = false;
    currPlayerIndex++;
    if(currPlayerIndex >= players.length) currPlayerIndex = 0;
    currPlayer = players[currPlayerIndex];
    updateWeapon();
  } else if(players.length == 1) {
    alert('Winner!');
  } else alert('No Players Remaining.');
}
