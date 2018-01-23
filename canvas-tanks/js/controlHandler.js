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
  document.getElementById('dispWeapon').innerHTML = currWeapon;
}
function fire() {
  currPlayer.fire();
}

function keyHandler() {
  
}
