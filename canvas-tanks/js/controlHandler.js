function changeWeapon() {
  currPlayer.sweapon = document.getElementById('weaponWheel').value;
  document.getElementById('dispWeapon').innerHTML = currPlayer.sweapon;
  document.getElementById('weaponWheel').blur();
}
function updateWeapon() {
  document.getElementById('dispWeapon').innerHTML = currPlayer.sweapon;
  document.getElementById('weaponWheel').value = currPlayer.sweapon;
}
function fire() {
  currPlayer.fire();
}

var keyMap = {up: false, down: false, left: false, right: false, w: false, s: false, a: false, d: false};
addEventListener("keydown", function(e) {
  if(e.keyCode == 38) keyMap.up = true;
  if(e.keyCode == 40) keyMap.down = true;
  if(e.keyCode == 37) keyMap.left = true;
  if(e.keyCode == 39) keyMap.right = true;
  if(e.keyCode == 87) keyMap.w = true;
  if(e.keyCode == 83) keyMap.s = true;
  if(e.keyCode == 65) keyMap.a = true;
  if(e.keyCode == 68) keyMap.d = true;
});
addEventListener("keyup", function(e) {
  if(e.keyCode == 32 && !paused) {
    //console.log('fire');
    fire();
  }
  if(e.keyCode == 38) keyMap.up = false;
  if(e.keyCode == 40) keyMap.down = false;
  if(e.keyCode == 37) keyMap.left = false;
  if(e.keyCode == 39) keyMap.right = false;
  if(e.keyCode == 87) {
    keyMap.w = false;
  }
  if(e.keyCode == 83) {
    keyMap.s = false;
  }
  if(e.keyCode == 65) keyMap.a = false;
  if(e.keyCode == 68) keyMap.d = false;
});

function handleKeys() {
  if(keyMap.up) {
    currPlayer.spower += .25;
    currPlayer.spower = clamp(currPlayer.spower, 1, 100);
  }
  if(keyMap.down) {
    currPlayer.spower -= .25;
    currPlayer.spower = clamp(currPlayer.spower, 1, 100);
  }
  if(keyMap.left) {
    currPlayer.sangle += rad(.25);
  }
  if(keyMap.right) {
    currPlayer.sangle -= rad(.25);
  }
  if(keyMap.a) {
    if(currPlayer.pos.x - 1 > 14) currPlayer.move(-1);
  }
  if(keyMap.d) {
    if(currPlayer.pos.x + 15 < canvas.width) currPlayer.move(+1);
  }
}
