function getShotType(name) {
  for (shot of shotTypes) {
    if(shot.name == name) return shot;
  }
}

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
    explDamage: 10,
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
    explDamage: 10,
    explColor: "#ffffff"
  }
];
