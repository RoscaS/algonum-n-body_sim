class Body {

  constructor(position, velocity, mass) {
    this.position = position;
    this.velocity = velocity;
    this.mass = mass;
    this.color = new Color();
    this.radius = Math.cbrt(mass);
  }

  /*---------------------------------------------------------*\
 	|*							        Public Methods
 	\*---------------------------------------------------------*/

  collision(other) {

    let mass = this.mass + other.mass;
    this.color = this.mass < other.mass ? other.color : this.color;
    this.velocity.x = (this.velocity.x * this.mass + other.velocity.x * other.mass) / mass;
    this.velocity.y = (this.velocity.y * this.mass + other.velocity.y * other.mass) / mass;
    this.position.x = (this.position.x * this.mass + other.position.x * other.mass) / mass;
    this.position.y = (this.position.y * this.mass + other.position.y * other.mass) / mass;
    this.radius = Math.cbrt(mass);
    this.mass = mass;
  }

  toString() {
    return `${this.position}, ${this.velocity}, m: ${this.mass}, r: ${this.radius}, c: ${this.color}`;
  }

  /*---------------------------------*\
 	|*						  Getters
 	\*---------------------------------*/

  // get x() {
  //   return this.position.x;
  // }
  //
  // get y() {
  //   return this.position.y;
  // }
  //
  // get vX() {
  //   return this.velocity.x;
  // }
  //
  // get vY() {
  //   return this.velocity.y;
  // }

}
