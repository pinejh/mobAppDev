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

function xtoi(x) {
  return (x+1)/gXScale;
}
function itox(i) {
  return i*gXScale-1;
}

function groundHeight(x) {
  x = clamp(x, -1, 641);
  if((x+1)%gXScale == 0) return ground[Math.floor(xtoi(x))]*gYScale;
  else {
    var lower = Math.floor(xtoi(x)), upper = Math.ceil(xtoi(x));
    var weight = -lower + xtoi(x);
    return (ground[lower]*(1-weight)+ground[upper]*weight)*gYScale;
  }
}

function groundAngle(x) {
  x = clamp(x, -1, 641);
  if((x+1)%gYScale == 0) {
    return (groundAngle(x-.1)+groundAngle(x+.1))/2;
  }
  else {
    var lower = -ground[Math.floor(xtoi(x))]*gYScale, upper = -ground[Math.ceil(xtoi(x))]*gYScale;
    return Math.atan((upper-lower)/gXScale);
  }
}

function backgroundAdjust(pos, radius) {
  var init = Math.floor(xtoi(pos.x - radius));
  var fin = Math.ceil(xtoi(pos.x + radius));
  for(var i = init; i < fin; i++) {
    var delta = Math.sqrt(radius*radius - Math.pow(pos.x-itox(i), 2))/gXScale;
    var lower = (canvas.height-pos.y)/gYScale-delta;
    var gh = ground[i];
    if(gh > lower) {
      if(gh < lower+delta*2) {
        ground[i] -= (gh-lower);
      } else {
        ground[i] -= (delta*2);
      }
    }
  }
}
