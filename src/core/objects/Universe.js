class Universe {
  constructor(screenCenter) {
    this.screenCenter = screenCenter;
    this.G = config.physics.G;
    this.initialMass = config.physics.baseMass;
    this.bodies = []; // access O(n)
    // this.bodies = {}; // access O(1)
  }

  /*---------------------------------------------------------*\
 	|*							        Public Methods
 	\*---------------------------------------------------------*/

  addBody(x, y, vX, vY, mass) {
    let position = new Position(x, y);
    let velocity = new Vector2(vX, vY);
    this.bodies.push(new Body(position, velocity, mass));
  }

  computeAttraction(fps) {

    let b = this.bodies;
    for (let i in b) {
      let force = new Vector2(0, 0);

      for (let j in b) {
        if (b[i] !== b[j]) {
          let dx = b[i].position.x - b[j].position.x;
          let dy = b[i].position.y - b[j].position.y;

          let distance = Math.sqrt(dx ** 2 + dy ** 2);

          if (distance < b[i].radius + b[j].radius) {
            b[i].collision(b[j]);
            b.splice(j, 1);
          } else {
            let magnitude = (this.G * b[i].mass * b[j].mass) / distance ** 2;
            let next = magnitude / b[i].mass + magnitude / b[j].mass;

            if (distance < next) {
              b[i].collision(b[j]);
              b.splice(j, 1);
            } else {
              force.x -= Math.abs(magnitude * (dx / distance)) * Math.sign(dx);
              force.y -= Math.abs(magnitude * (dy / distance)) * Math.sign(dy);
            }
          }
        }
      }

      b[i].velocity.x += force.x / b[i].mass;
      b[i].velocity.y += force.y / b[i].mass;
    }

    for (let i in b) {
      b[i].position.x += (b[i].velocity.x / 10) * (config.fps / fps);
      b[i].position.y += (b[i].velocity.y / 10) * (config.fps / fps);
    }
  }

  /*---------------------------------*\
 	|*						  Actions
 	\*---------------------------------*/

  cloud(mousePosition) {
    for (let i = 0; i < 1000; i++) {
      let angle = randomAngle();
      let distance = randomDistance(15);

      let cos = Math.cos(angle);
      let sin = Math.sin(angle);
      let x = (mousePosition.x - this.screenCenter.x) + distance * cos;
      let y = (mousePosition.y - this.screenCenter.y) + distance * sin;
      let vx = (distance * sin) / 50;
      let vy = (-distance * cos) / 50;
      this.bodies.push(new Body(new Position(x, y), new Vector2(vx, vy), 2));

    }
  }
}
