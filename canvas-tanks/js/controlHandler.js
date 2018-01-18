var currAngle = 45, currPower = 50;

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
  console.log(document.getElementById('weaponWheel').value);
}
function fire() {
  entities.push(new Shot(currAngle, currPower, 0, canvas.height));
}
