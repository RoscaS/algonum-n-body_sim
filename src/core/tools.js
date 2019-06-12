
function sqaredAcceleration(j, x, y, r) {
  let dAx = 0;
  let dAy = 0;

  for (let i = 0; i < prevBodies.length; i++) {
    let other = prevBodies[i];
    if (i !== j) {
      let dx = other.x - x;
      let dy = other.y - y;
      let distance = Math.max(Math.sqrt(dx * dx + dy * dy), r + other.r);

      let acceleration = other.m / (distance * distance);
      dAx += (acceleration * dx) / distance;
      dAy += (acceleration * dy) / distance;
    }
  }
  return [dAx, dAy];
}


function cluster(ix, iy, ivx, ivy) {
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
