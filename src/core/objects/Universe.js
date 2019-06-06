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

  computeAttraction() {

    for (let i = 0; i < this.bodies.length; i++) {
      // let force = new Vector2(0, 0);
      let fx = 0;
      let fy = 0;

      for (let j = 0; j < this.bodies.length; j++) {
        if (j !== i) {

          let dx = this.bodies[i].position.x - this.bodies[j].position.x;
          let dy = this.bodies[i].position.y - this.bodies[j].position.y;

          let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

          if (distance < this.bodies[i].radius + this.bodies[j].radius) {
            this.bodies[i].collision(this.bodies[j]);
            this.bodies.splice(j, 1);

          } else {
            let magnitude = (this.G * (this.bodies[i].mass * this.bodies[j].mass)) / Math.pow(distance, 2);

            let next = magnitude / this.bodies[i].mass + magnitude / this.bodies[j].mass;

            if (distance < next) {

              this.bodies[i].collision(this.bodies[j]);
              this.bodies.splice(j, 1);

            } else {
              fx -= Math.abs(magnitude * (dx / distance)) * Math.sign(dx);
              fy -= Math.abs(magnitude * (dy / distance)) * Math.sign(dy);
            }
          }
        }
      }

      this.bodies[i].velocity.x += fx / this.bodies[i].mass;
      this.bodies[i].velocity.y += fy / this.bodies[i].mass;
    }

    for (let i = 0; i < this.bodies.length; i++) {
      this.bodies[i].position.x += (this.bodies[i].velocity.x / 10) * (60 / fps);
      this.bodies[i].position.y += (this.bodies[i].velocity.y / 10) * (60 / fps);

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
