let tracking = false;
let zoomLevel = 1;

let frameTime = 0;
let lastLoop = new Date();

let bodies = [];
let prevBodies = [];


function run() {
  prevBodies = [];

  draw();
  drawVelocityLine();
  if (tracking) return;

  for (let i = 0; i < bodies.length; i++) {
    let b = bodies[i];
    prevBodies.push(new Body(b.m, b.x, b.y, b.vx, b.vy, b.color));
  }

  for (let i = 0; i < bodies.length; i++) {
    takeStep(i);
  }

  for (let j = 0; j < bodies.length; j++) {
    let body = bodies[j];

    for (let i = j + 1; i < bodies.length; i++) {
      // Attention au j + 1
      let other = bodies[i];

      if (!body.collision && !other.collision) {
        let dx = other.x - body.x;
        let dy = other.y - body.y;
        let d = Math.sqrt(dx * dx + dy * dy);

        if (d < other.r + body.r) {
          other.collision = true;
          body.collision = true;

          let mass = other.m + body.m;

          // new body
          let x = (other.x * other.m + body.x * body.m) / mass;
          let y = (other.y * other.m + body.y * body.m) / mass;
          let vx = (other.vx * other.m + body.vx * body.m) / mass;
          let vy = (other.vy * other.m + body.vy * body.m) / mass;
          let color = other.m > body.m ? other.color : body.color;
          bodies.push(new Body(mass, x, y, vx, vy, color));
        }
      }
    }
  }

  for (let i = 0; i < bodies.length; i++) {
    let body = bodies[i];
    if (body.collision) {
      bodies.splice(i--, 1);
    }
  }

  let thisLoop = new Date();
  let thisFrameTime = thisLoop - lastLoop;
  frameTime += (thisFrameTime - frameTime) / 20.0;
  lastLoop = thisLoop;
}

function takeStep(i) {
  let body = bodies[i];
  let x = body.x;
  let y = body.y;

  let prevBody = prevBodies[i];
  let prevR = prevBody.r;
  let prevX = prevBody.x;
  let prevY = prevBody.y;

  let h = conf.timeStep * conf.timeMultiplicator;

  // Euler
  let acceleration = sqaredAcceleration(i, prevX, prevY, prevR);

  

  body.vx = body.vx + acceleration[0] * h;
  body.vy = body.vy + acceleration[1] * h;
  body.x += body.vx * h;
  body.ox = x;
  body.y += body.vy * h;
  body.oy = y;
}

function init() {
  frameTime = 0;
  lastLoop = new Date();

  // initUI();

  run();
  setInterval(run, 10);
}

window.onload = init;
