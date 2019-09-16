// Objet: Algo Num projet final
// Date: 14 juin 2019
// Sol Rosca


let conf = {
  running: true,
  track: false,
  netForceVectors: false,
  velocityVectors: false,
  info: true,
  zoomLevel: 1,
  minMass: 500,
  maxMass: 500000,
  timeStep: 1 / 60,
  timeMultiplicator: 1,
  trailOpacity: 1,
  mass: 32000,
  g: 3,

  centerX: window.innerWidth / 2,
  centerY: window.innerHeight / 2,

  initialRadius: Math.log(Math.E + 1.0)
};

let vectorType = {
  type1: [0, 1, -10, 1, -10, 5],
  type2: [0, 1, -12, 1, -20, 10],
  type3: [0, 1],
};
