const groundRes = 322;
const gXScale = 2, gYScale = 2;
var ground = [];

function initBackground() {
  for(var x = 0; x < groundRes; x++) {
    ground[x] = Math.sin(x/20)*25 + 35;
  }
}

function drawBackground() {
  c.beginPath();
  c.moveTo(-1, canvas.height);
  for(var x = 0; x < groundRes; x++) {
    c.lineTo(x*gXScale - 1, canvas.height-ground[x]*gYScale);
  }
  c.lineTo(canvas.width+1, canvas.height);
  c.closePath();
  c.fillStyle = "#44a8ff";
  c.fill();
}

function groundHeight(x) {
  x.clamp(-1, 641);
  if((x+1)%gYScale == 0) return ground[Math.floor((x+1)/gYScale)];
  else {
    var lower = Math.floor((x+1)/gYScale), upper = Math.ceil((x+1)/gYScale);
    var weight = -lower + (x+1)/gYScale;
    return (ground[lower]*(1-weight)+ground[upper]*weight)*gYScale;
  }
}

function groundAngle(x) {
  
}