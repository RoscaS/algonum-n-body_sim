class Body {
  constructor(mass, velocity, x, y) {
    this.x = x;
    this.y = y;
    this.mass = mass;
    this.velocity = velocity;
    this.color = new Color();
    this.radius = Math.cbrt(this.mass);
  }

  absorb(other) {
    if (this.mass < other.mass) {
      this.color = other.color;
    }
    this.velocity.x =
      (this.velocity.x * this.mass + other.velocity.x * other.mass) /
      (this.mass + other.mass);
    this.velocity.y =
      (this.velocity.y * this.mass + other.velocity.y * other.mass) /
      (this.mass + other.mass);
    this.x = (this.x * this.mass + other.x * other.mass) / (this.mass + other.mass);
    this.y = (this.y * this.mass + other.y * other.mass) / (this.mass + other.mass);
    this.mass += other.mass;
    this.radius = Math.cbrt(this.mass);
  }

  paint(context) {
    context.beginPath();
    let x = this.x * zoomScale + xOffset;
    let y = this.y * zoomScale + yOffset;
    context.arc(x, y, this.radius * zoomScale, 0, 2 * Math.PI, false);
    context.fillStyle = this.color.toString();
    context.fill();
  }

  static paintBodies(p, ctx) {
  	for (var i = 0; i < p.length; i++) {
  		p[i].paint(ctx);
  	}
  }

  static computeAttraction(p) {
    for (let i = 0; i < p.length; i++) {
      let forceSum = new Vector(0, 0);
      for (let j = 0; j < p.length; j++) {
        if (j != i) {
          let xDist = p[i].x - p[j].x;
          let yDist = p[i].y - p[j].y;
          let distance = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
          if (distance < p[i].radius + p[j].radius) {
            p[i].absorb(p[j]);
            p.splice(j, 1);
          } else {
            let forceMag =
              (gravityConstant * (p[i].mass * p[j].mass)) /
              Math.pow(distance, 2);
            let nextStep = forceMag / p[i].mass + forceMag / p[j].mass;
            if (distance < nextStep) {
              p[i].absorb(p[j]);
              p.splice(j, 1);
            } else {
              forceSum.x -=
                Math.abs(forceMag * (xDist / distance)) * Math.sign(xDist);
              forceSum.y -=
                Math.abs(forceMag * (yDist / distance)) * Math.sign(yDist);
            }
          }
        }
      }
      p[i].velocity.x += forceSum.x / p[i].mass;
      p[i].velocity.y += forceSum.y / p[i].mass;
    }
    for (let i = 0; i < p.length; i++) {
      // 60 / fps to take bigger steps when the simulation is running slower
      p[i].x += (p[i].velocity.x / 10) * (60 / fps);
      p[i].y += (p[i].velocity.y / 10) * (60 / fps);
    }
  }
}
