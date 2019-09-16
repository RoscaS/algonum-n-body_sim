// Objet: Algo Num projet final
// Date: 14 juin 2019
// Sol Rosca


let shouldClear = false;

let canvas = document.getElementById("canvas");
canvas.style.left = "0px";
canvas.style.top = "0px";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.zIndex = 0;
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let ctx = canvas.getContext("2d");

canvas.onmousemove = mouseMove;
canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp;
canvas.oncontextmenu = rightClick;
canvas.onkeydown = keydown;
canvas.onmousewheel = mouseWheel;

let background = document.getElementById("background");
background.style.left = "0px";
background.style.top = "0px";
background.style.width = "100%";
background.style.height = "100%";
background.style.zIndex = 1;
background.width = background.offsetWidth;
background.height = background.offsetHeight;

let bgCtx = background.getContext("2d");

function drawLine(ax, ay, bx, by, color = "#2299ff") {
  bgCtx.lineWidth = 1;
  bgCtx.beginPath();
  bgCtx.moveTo(ax, ay);
  bgCtx.lineTo(bx, by);
  bgCtx.strokeStyle = color;
  // bgCtx.fill();
  bgCtx.stroke();
}

function drawVector(ax, ay, bx, by, type, color = "#2299ff") {
  bgCtx.lineWidth = 1;
  bgCtx.beginPath();
  bgCtx.arrow(ax, ay, bx, by, type);
  bgCtx.fillStyle = color + "90";
  bgCtx.fill();
  bgCtx.strokeStyle = "#00000050";
  bgCtx.stroke();
}

function drawInitialImpulse() {
  if (inputs.mouseDown) {
    drawVector(
      inputs.clickX,
      inputs.clickY,
      inputs.currentX,
      inputs.currentY,
      vectorType.type1
    );
  }
}

function draw() {
  bgCtx.clearRect(0, 0, canvas.width, canvas.height);
  let alpha = conf.trailOpacity;
  if (inputs.ctrlDown || shouldClear) {
    alpha = 0.5;
  }
  if (shouldClear) {
    shouldClear = false;
    bodies = [];
  }
  ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < bodies.length; i++) {
    bodies[i].draw(ctx);
    drawVectors(bodies[i]);
  }
  drawInitialImpulse();
}

function drawNetForceVector(body) {
  drawVector(
    body.x,
    body.y,
    body.x + body.fX / 2,
    body.y + body.fY / 2,
    vectorType.type1,
    body.color
  );
}

function drawVelocityVector(body) {
  drawVector(
    body.x,
    body.y,
    body.x + body.vx / 2,
    body.y + body.vy / 2,
    vectorType.type3,
    body.color
  );
}

function drawVectors(body) {
  if (conf.velocityVectors) drawNetForceVector(body);
  if (conf.netForceVectors) drawVelocityVector(body);
}

let fps = document.getElementById("fps");
let bodyCount = document.getElementById("body-count");
let initialMass = document.getElementById("initial-mass");

function initUI() {
  setInterval(function() {
    fps.innerHTML = `Fps: ${(1000 / frameTime).toFixed(2)}`;
    bodyCount.innerHTML = `Body count: ${bodies.length}`;
    initialMass.innerHTML = `Initial mass: ${conf.mass}`;
  }, 100);
}
