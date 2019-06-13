let tracking = false;
let zoomLevel = 1;

let frameTime = 0;
let lastLoop = new Date();

function run() {
  prevBodies = [];

  draw();
  drawVelocityLine();
  if (tracking) return;

  // prevBodies permet de garder une copie clean des particules
  // pour appliquer les modifications lors du step partir des
  // donnees non modifiees.
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

  // Euler
  let aX = 0;
  let aY = 0;
  let h = conf.timeStep * conf.timeMultiplicator;

  for (let j = 0; j < prevBodies.length; j++) {
    let other = prevBodies[j];

    if (j !== i) {
      let dx = other.x - body.x;
      let dy = other.y - body.y;
      let distance = Math.max(Math.sqrt(dx * dx + dy * dy), body.r + other.r);

      let acceleration = other.m / (distance * distance);
      aX += (acceleration * dx) / distance;
      aY += (acceleration * dy) / distance;
    }
  }

  body.vx = body.vx + aX * h;
  body.vy = body.vy + aY * h;

  body.x += body.vx * h;
  body.y += body.vy * h;
}

function takeStep1(i) {
  // Conservation de l'energie respectee

  let body = bodies[i];


  // Euler
  let aX = 0;
  let aY = 0;
  let h = conf.timeStep * conf.timeMultiplicator;

  for (let j = 0; j < bodies.length; j++) {
    let other = bodies[j];

    if (j !== i) {
      let dx = other.x - body.x;
      let dy = other.y - body.y;
      let d = Math.sqrt(dx * dx + dy * dy);

      let a = other.m / (d * d);
      aX += (a * dx) / d;
      aY += (a * dy) / d;
    }
  }

  body.vx = body.vx + aX * h;
  body.vy = body.vy + aY * h;

  body.x += body.vx * h;
  body.y += body.vy * h;
}


function takeStep2(i) {
  // WORKING
  // Conservation de l'energie respectee

  let body = bodies[i];

  let prevBody = prevBodies[i];
  let prevR = prevBody.r;
  let prevX = prevBody.x;
  let prevY = prevBody.y;


  // Euler
  let aX = 0;
  let aY = 0;
  let h = conf.timeStep * conf.timeMultiplicator;

  for (let j = 0; j < prevBodies.length; j++) {
    let other = prevBodies[j];

    if (j !== i) {
      let dx = other.x - prevX;
      let dy = other.y - prevY;
      let distance = Math.max(Math.sqrt(dx * dx + dy * dy), prevR + other.r);

      let acceleration = other.m / (distance * distance);
      aX += (acceleration * dx) / distance;
      aY += (acceleration * dy) / distance;
    }
  }

  body.vx = body.vx + aX * h;
  body.vy = body.vy + aY * h;

  body.x += body.vx * h;
  body.y += body.vy * h;
}



function init() {
  frameTime = 0;
  lastLoop = new Date();

  initUI();
  setInterval(run, 10);
}

window.onload = init;
