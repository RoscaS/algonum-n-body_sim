class KeyboardHandler {
  event = null;

  constructor(context) {
    this.context = context;
    window.addEventListener("keyup", e => {
      this.event = e;

      // add up and down arrow to inc/dec mass
      switch (e.key) {
        case "h":
          // help
          break;
        case "k":
          this.randDist();
          break;
        case " ":
          this.cloud(mouse.currentX - centerX, mouse.currentY - centerY);
          break;
        case "c":
          tracking = !tracking;
          break;
        case "d":
          KeyboardHandler.clean(particles); // delete bodies out of sight
          break;
        case "q":
          gravityConstant *= 1.2;
          break;
        case "a":
          gravityConstant /= 1.2;
          break;
        case "p":
          running = !running;
          break;
      }
    });
  }

  cloud(centerX, centerY) {
    for (let i = 0; i < 1000; i++) {
      let angle = Math.random() * 2 * Math.PI;
      let dist = Math.pow(Math.random() * 15, 2);

      let x = centerX + dist * Math.cos(angle);
      let y = centerY + dist * Math.sin(angle);

      let vx = (dist * Math.sin(angle)) / 50;
      let vy = (-dist * Math.cos(angle)) / 50;

      particles.push(new Body(2, new Vector(vx, vy), x, y));
    }
    Body.paintBodies(particles, this.context);
  }

  randDist() {
    let xMax = window.innerWidth;
    let yMax = window.innerHeight;

    for (let i = 0; i < 1000; i++) {
      let x = (Math.random() * xMax - centerX) / zoomScale;
      let y = (Math.random() * yMax - centerY) / zoomScale;

      let vx = Math.random() * 10 - 5;
      let vy = Math.random() * 10 - 5;

      particles.push(new Body(2, new Vector(vx, vy), x, y));
    }
    Body.paintBodies(particles, this.context);
  }

  static center(p) {
    let x = 0;
    let y = 0;
    let maxMass = 0;
    for (let i = 0; i < p.length; i++) {
      if (p[i].mass > maxMass) {
        x = p[i].x * zoomScale;
        y = p[i].y * zoomScale;
        maxMass = p[i].mass;
      }
    }
    centerX = window.innerWidth / 2 - x;
    centerY = window.innerHeight / 2 - y;
  }

  static clean(p) {
    for (let i = 0; i < p.length; i++) {
      let x = p[i].x * zoomScale + centerX;
      let y = p[i].y * zoomScale + centerY;
      if (x < 0 || x > window.innerWidth || y < 0 || y > window.innerHeight) {
        p.splice(i, 1);
      }
    }
  }
}


