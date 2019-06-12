class Body {
  constructor(m, x, y, vx, vy, color) {
    this.m = m;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color == null ? getColor() : color;
    // this.r = Math.log(Math.E + m / conf.minMass);
    this.r = Math.cbrt(this.m) / 10;
    this.collision = false;

    this.ox = 0;
    this.oy = 0;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, 0);
    context.fillStyle = this.color;
    context.fill();
  }
}
