//var currAngle = 45, currPower = 50, currWeapon = "Single Shot";

function changeAngle() {
  var newangle = document.getElementById('angleSlider').value;
  currPlayer.sangle = rad(parseInt(newangle));
  document.getElementById('dispAngle').innerHTML = newangle;
}
function changePower() {
  var newpower = document.getElementById('powerSlider').value;
  currPlayer.spower = parseInt(newpower);
  document.getElementById('dispPower').innerHTML = newpower;
}
function changeWeapon() {
  currPlayer.sweapon = document.getElementById('weaponWheel').value;
  document.getElementById('dispWeapon').innerHTML = currPlayer.sweapon;
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
