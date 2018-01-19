function getShotType(name) {
  for (shot of shotTypes) {
    if(shot.name == name) return shot;
  }
}

var shotTypes = [
  {
    name: "Single Shot",
    radius: 5,
    color: "#000",
    trail: true,
    trailColor: "#0000ff",
    explRadius: 10,
    damage: 0,
    explDamage: 10,
    explColor: "#0000ff"
  },
  {
    name: "Big Shot",
    radius: 10,
    color: "#000",
    trail: true,
    trailColor: "#ff0000",
    explRadius: 15,
    damage: 0,
    explDamage: 10,
    explColor: "#ff0000"
  }
];
