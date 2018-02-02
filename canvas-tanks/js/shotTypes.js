function initShots() {
  for (shot of shotTypes) {
    console.log(shot.name);
    document.getElementById('weaponWheel').innerHTML += '<option value="' + shot.name + '">' + shot.name + '</option>';
  }
}

function getShotType(name) {
  for (shot of shotTypes) {
    if(shot.name == name) return shot;
  }
}

/*
{
  name: "",
  radius: ,
  color: "",
  trail: ,
  trailColor: "",
  explRadius: ,
  damage: ,
  hitPlayer: ,
  explGround: ,
  explDamage: ,
  explColor: ""
}
*/

var shotTypes = [
  {
    name: "Single Shot",
    radius: 5,
    color: "#ffffff",
    trail: true,
    trailColor: "#e0e0e0",
    explRadius: 12,
    damage: 0,
    hitPlayer: true,
    explGround: true,
    explDamage: 25,
    explColor: "#ffffff"
  },
  {
    name: "Big Shot",
    radius: 8,
    color: "#ffffff",
    trail: true,
    trailColor: "#e0e0e0",
    explRadius: 17.5,
    damage: 0,
    hitPlayer: true,
    explGround: true,
    explDamage: 20,
    explColor: "#ffffff"
  },
  {
    name: "Ghost Shot",
    radius: 8,
    color: "rgba(100, 100, 100, .5)",
    trail: true,
    trailColor: "rgba(50, 50, 50, .5)",
    explRadius: 50,
    damage: 0,
    hitPlayer: true,
    explGround: false,
    explDamage: 10,
    explColor: "#ffffff"
  },
  {
    name: "Sniper",
    radius: 2,
    color: "#ffffff",
    trail: true,
    trailColor: "#ffffff",
    explRadius: 2,
    damage: 100,
    hitPlayer: true,
    explGround: false,
    explDamage: 0,
    explColor: "#ffffff"
  }
];
