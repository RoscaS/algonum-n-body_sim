class KeyboardHandler {
  event = null;

  constructor(context) {
    this.context = context;
    window.addEventListener("keyup", e => {
      this.event = e;
      console.log(this.event);

      // add up and down arrow to inc/dec mass
      switch (e.key) {
        case "h":
          // help
          break;
        case "k":
          this.randDist();
          break;
        case " ":
          this.cloud(mouse.currentX - mouse.offsetX, mouse.currentY - mouse.offsetY);
          break;
        case "c":
          tracking = !tracking;
          break;
        case "d":
          this.clean(particles); // delete bodies out of sight
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

  static cloud(centerX, centerY) {
    for (let i = 0; i < 1000; i++) {
      let angle = Math.random() * 2 * Math.PI;
      let dist = Math.pow(Math.random() * 15, 2);
      let x = centerX + dist * Math.cos(angle);
      let y = centerY + dist * Math.sin(angle);
      let vx = (dist * Math.sin(angle)) / 50;
      let vy = (-dist * Math.cos(angle)) / 50;
      new Body(2, new Vector(vx, vy), x, y);
    }
    Body.paintBodies(particles, this.context);
  }

  static randDist() {
    let xMax = $(window).width();
    let yMax = $(window).height();
    for (let i = 0; i < 1000; i++) {
      let x = (Math.random() * xMax - mouse.offsetX) / zoomScale;
      let y = (Math.random() * yMax - mouse.offsetY) / zoomScale;
      let vx = Math.random() * 10 - 5;
      let vy = Math.random() * 10 - 5;
      new Body(2, new Vector(vx, vy), x, y);
    }
    Body.paintBodies(particles, this.context);
  }

  static center(p) {
    console.log('ici');
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
    mouse.offsetX = $(window).width() / 2 - x;
    mouse.offsetY = $(window).height() / 2 - y;
  }

  static clean(p) {
    for (let i = 0; i < p.length; i++) {
      let x = p[i].x * zoomScale + xOffset;
      let y = p[i].y * zoomScale + yOffset;
      if (x < 0 || x > $(window).width() || y < 0 || y > $(window).height()) {
        p.splice(i, 1);
      }
    }
  }
}


