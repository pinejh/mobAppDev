var canvas = document.querySelector('canvas');
canvas.width = 640;
canvas.height = 480;

var c = canvas.getContext('2d');

var entities = [];

function update() {
  c.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = entities.length-1; i >= 0; i--) {
    entities[i].update();
    if(entities[i].pos.x > canvas.width || entities[i].pos.y > canvas.height) entities.splice(i, 1);
  }

  requestAnimationFrame(update);
}
