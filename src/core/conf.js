let conf = {
  running: true,
  track: false,
  zoomLevel: 1,
  minMass: 500,
  maxMass: 500000,
  timeStep: 1/60,
  timeMultiplicator: 1,
  trailOpacity: 1,
  mass: 32000,
  damping: 0,
  g: 3,

  centerX: window.innerWidth / 2,
  centerY: window.innerHeight / 2,

  initialRadius: Math.log(Math.E + 1.0),
  // initialRadius: 2,
};
