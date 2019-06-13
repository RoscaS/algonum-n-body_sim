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

function drawLine(ax, ay, bx, by) {
  bgCtx.lineWidth = 2;
  bgCtx.beginPath();
  bgCtx.lineCap = "round";
  bgCtx.moveTo(ax, ay);
  bgCtx.lineTo(bx, by);
  bgCtx.strokeStyle = "#2299ff";
  bgCtx.stroke();
}

function drawVelocityLine() {
  if (inputs.mouseDown) {
    drawLine(inputs.clickX, inputs.clickY, inputs.currentX, inputs.currentY);
  }
}

function draw() {
  bgCtx.clearRect(0, 0, canvas.width, canvas.height);
  let alpha = conf.trailOpacity;
  if (inputs.ctrlDown || shouldClear) {
    alpha = .5;
  }
  if (shouldClear) {
    shouldClear = false;
    bodies = [];
    collisions = [];
  }
  ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < bodies.length; i++) {
    bodies[i].draw(ctx);
  }

}


let fps = document.getElementById("fps");
let bodyCount = document.getElementById("body-count");
let initialMass = document.getElementById("initial-mass");
let timeStep = document.getElementById("time-step");
let trailOpacity = document.getElementById("trail-opacity");

function initUI() {
  setInterval(function() {
    fps.innerHTML = `Fps: ${(1000 / frameTime).toFixed(2)}`;
    bodyCount.innerHTML = `Body count: ${bodies.length}`;
    initialMass.innerHTML = `Initial mass: ${conf.mass}`;
    timeStep.innerHTML = `Speed: x${conf.timeMultiplicator}`;
    trailOpacity.innerHTML = `Trail opacity: ${conf.trailOpacity.toFixed(2)}`;
  }, 100);
}
