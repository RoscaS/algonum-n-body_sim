let tracking = false;
let zoomLevel = 1;

let frameTime = 0;
let lastLoop = new Date();



function run() {
  prevBodies = [];

  draw();
  drawVelocityLine();
  if (tracking) return;

  for (let i = 0; i < bodies.length; i++) {
    prevBodies.push(bodies[i].clone());
  }

  for (let i = 0; i < bodies.length; i++) {
    takeStep(i);
  }

  for (let i = 0; i < bodies.length; i++) {
    let body = bodies[i];

    for (let j = i + 1; j < bodies.length; j++) {
      let other = bodies[j];

      if (checkForCollision(body, other)) {
        body.collision = true;
        other.collision = true;
        mergeBodies(body, other);
      }
    }
  }

  for (let i = 0; i < bodies.length; i++) {
    if (bodies[i].collision) {
      bodies.splice(i--, 1);
    }
  }

  updateTime();
}

function takeStep(i) {
  let body = bodies[i];
  let x = body.x;
  let y = body.y;

  let prevBody = prevBodies[i];
  let prevR = prevBody.r;
  let prevX = prevBody.x;
  let prevY = prevBody.y;


  // Euler
  let dAx = 0;
  let dAy = 0;
  let h = conf.timeStep * conf.timeMultiplicator;

  for (let j = 0; j < prevBodies.length; j++) {
    let other = prevBodies[j];

    if (j !== i) {
      let dx = other.x - prevX;
      let dy = other.y - prevY;
      let distance = Math.max(Math.sqrt(dx * dx + dy * dy), prevR + other.r);

      let acceleration = other.m / (distance * distance);
      dAx += (acceleration * dx) / distance;
      dAy += (acceleration * dy) / distance;
    }
  }

  body.update(x, y, dAx, dAy, h);
}

function init() {
  frameTime = 0;
  lastLoop = new Date();

  // initUI();
  run();
  setInterval(run, 10);
}

window.onload = init;
