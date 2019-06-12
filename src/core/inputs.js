let inputs = {
  mouseDown: false,
  rightClick: false,
  ctrlDown: false,
  clickX: 0,
  clickY: 0,
  currentX: 0,
  currentY: 0
};

window.addEventListener("keyup", e => {keyup(e);});
window.addEventListener("keydown", e => {keydown(e);});
window.addEventListener("resize", eventResize, false);


function mouseDown(e) {
  inputs.mouseDown = true;
  inputs.clickX = e.layerX - conf.initialRadius;
  inputs.clickY = e.layerY - conf.initialRadius;
}

function mouseMove(e) {
  let oldX = inputs.currentX;
  let oldY = inputs.currentY;
  inputs.currentX = e.clientX - canvas.offsetLeft;
  inputs.currentY = e.clientY - canvas.offsetTop;

  let dx = (inputs.currentX - oldX) / 2;
  let dy = (inputs.currentY - oldY) / 2;
  if (inputs.ctrlDown && !inputs.mouseDown) {
    for (let i = 0; i < bodies.length; i++) {
      bodies[i].x += dx;
      bodies[i].ox += dx;
      bodies[i].y += dy;
      bodies[i].oy += dy;
    }
  }
}

function mouseUp(e) {
  let vx = e.layerX - conf.initialRadius - inputs.clickX;
  let vy = e.layerY - conf.initialRadius - inputs.clickY;

  if (inputs.rightClick) {
    inputs.rightClick = false;
    inputs.mouseDown = false;
    createCluster(inputs.clickX, inputs.clickY, vx, vy);
  } else {
    inputs.rightClick = false;
    inputs.mouseDown = false;
    bodies.push(new Body(conf.mass, inputs.clickX, inputs.clickY, vx, vy));
  }
}

function rightClick(e) {
  inputs.rightClick = true;
  return false;
}

function mouseWheel(e) {

  if (e.altKey) {
    let multiplicator = 1;
    if (conf.trailOpacity > .1) multiplicator = .1;

    else if (conf.trailOpacity < .15) multiplicator = .01;

    conf.trailOpacity += e.deltaY < 0 ? multiplicator : -multiplicator;
    if (conf.trailOpacity > 1) conf.trailOpacity = 1;
    if (conf.trailOpacity < 0) conf.trailOpacity = 0;

  }
  else if (e.shiftKey) {
    conf.timeMultiplicator *= e.deltaY < 0 ? 2 : 1 / 2;
    if (conf.timeMultiplicator > 4) conf.timeMultiplicator = 4;
    if (conf.timeMultiplicator < .25) conf.timeMultiplicator = .25;
  }
  else {
    conf.mass *= e.deltaY < 0 ? 2 : 1 / 2;
    if (conf.mass > conf.maxMass) conf.mass = conf.maxMass;
    if (conf.mass < conf.minMass) conf.mass = conf.minMass;
  }
  return false;
}

function keydown(e) {
  console.log(e);
  switch (e.key) {
    case "Control":
      inputs.ctrlDown = true;
      break;
    case "c":
      tracking = !tracking;
      break;
    case "d":
      // clean(bodies); // delete bodies out of sight
      break;
    case "p":
      // renderer.running = !renderer.running;
      break;
  }
}

function keyup(e) {
  switch (e.key) {
    case "Control":
      inputs.ctrlDown = false;
      break;
  }
}

function eventResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  background.width = window.innerWidth;
  background.height = window.innerHeight;
}


