var currAngle = 45, currPower = 50, currWeapon = "Single Shot";

function changeAngle() {
  var newangle = document.getElementById('angleSlider').value;
  currAngle = parseInt(newangle);
  document.getElementById('dispAngle').innerHTML = newangle;
}
function changePower() {
  var newpower = document.getElementById('powerSlider').value;
  currPower = parseInt(newpower);
  document.getElementById('dispPower').innerHTML = newpower;
}
function changeWeapon() {
  currWeapon = document.getElementById('weaponWheel').value;
  document.getElementById('dispWeapon').innerHTML = currWeapon;
}
function fire() {
  entities.unshift(new Shot(currAngle, currPower, 0, canvas.height, getShotType(currWeapon)));
  nextPlayer();
}
