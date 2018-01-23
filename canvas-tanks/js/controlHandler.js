function changeWeapon() {
  currPlayer.sweapon = document.getElementById('weaponWheel').value;
  document.getElementById('dispWeapon').innerHTML = currPlayer.sweapon;
}
function updateWeapon() {
  document.getElementById('dispWeapon').innerHTML = currPlayer.sweapon;
  document.getElementById('weaponWheel').value = currPlayer.sweapon;
}
function fire() {
  currPlayer.fire();
}

function keydown(e) {
  if(e.keyCode == 38) {
    //console.log('up');
    currPlayer.spower += 1;
    currPlayer.spower.clamp(1, 100);
  }
  if(e.keyCode == 40) {
    //console.log('down');
    currPlayer.spower -= 1;
    currPlayer.spower.clamp(1, 100);
  }
  if(e.keyCode == 37) {
    //console.log('left');
    currPlayer.sangle += rad(1);
  }
  if(e.keyCode == 39) {
    //console.log('right');
    currPlayer.sangle -= rad(1);
  }
}
function keypress(e) {
  //console.log('pressed '+e.keyCode);
}
function keyup(e) {
  if(e.keyCode == 32) {
    //console.log('fire');
    fire();
  }
}
