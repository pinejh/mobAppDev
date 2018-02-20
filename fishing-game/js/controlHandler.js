var m1 = false;

document.body.onmousedown = function(e) {
  if(e.button == 0) m1 = true;
};
document.body.onmouseup = function(e) {
  if(e.button == 0) m1 = false;
};
