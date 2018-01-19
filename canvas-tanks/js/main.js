var canvas = document.querySelector('canvas');
canvas.width = 640;
canvas.height = 480;

var c = canvas.getContext('2d');

var entities = [];
var explosions = [];

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
  for (var i = explosions.length-1; i >= 0; i--) {
    explosions[i].update();
    if(explosions[i].remove) explosions.splice(i, 1);

  }

  requestAnimationFrame(update);
}
