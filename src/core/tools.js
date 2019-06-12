
function mergeBodies(a, b) {
  let mass = a.m + b.m;
  let x = (a.x * a.m + b.x * b.m) / mass;
  let y = (a.y * a.m + b.y * b.m) / mass;
  let vx = (a.vx * a.m + b.vx * b.m) / mass;
  let vy = (a.vy * a.m + b.vy * b.m) / mass;
  let color = a.m > b.m ? a.color : b.color;
  bodies.push(new Body(mass, x, y, vx, vy, color));
}

function distance(body, other) {
  let dx = other.x - body.x;
  let dy = other.y - body.y;
  return  Math.sqrt(dx * dx + dy * dy);
}

function checkForCollision(body, other) {
  let a = !body.collision && !other.collision;
  let b = distance(other, body) < other.r + body.r;
  return a && b;
}

function updateTime() {
  let thisLoop = new Date();
  let thisFrameTime = thisLoop - lastLoop;
  frameTime += (thisFrameTime - frameTime) / 20.0;
  lastLoop = thisLoop;
}


function createCluster(ix, iy, ivx, ivy) {
  // let sign = Math.random() > 0.5 ? 1 : -1;

  let x = 0;
  let y = 0;
  let vx = 0;
  let vy = 0;

  for (let i = 0; i < 400; i++) {
    let angle = Math.PI * 2 * Math.random();
    let dist = (Math.random() * 15) ** 2;
    let cos = Math.cos(angle);
    let sin = Math.sin(angle);

    x = ix + dist * cos;
    y = iy + dist * sin;
    vx = ((dist * sin) / 2) + ivx;
    vy = ((-dist * cos) / 2) + ivy;

    let m = 4000;

    bodies.push(new Body(m, x, y, vx, vy));
    if (i === 0) {
      bodies.push(new Body(conf.mass, ix, iy, ivx, ivy));
    }
  }
}
