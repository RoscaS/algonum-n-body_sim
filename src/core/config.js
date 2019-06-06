
const config = {
  fps: 60,
  cloudSize: 1000,
  randomDistribution: 1000,
  physics: {
    G: 1,
    baseMass: 32,
    massFactor: 2,
    gFactor: 1.2,
    minMass: 2 ** 4,
    maxMass: 2 ** 15
  },
  camera: {
    zoomFactor: 1.2
  },
  vector: {
    size: [0, 0.1, -10, 0.1, -10, 3],
    color: "white",
    fill: "white"
  }
};
