// Objet: Algo Num projet final
// Date: 14 juin 2019
// Sol Rosca

let bodies = [];
let prevBodies = [];

class Body {
  constructor(m, x, y, vx, vy, color) {
    this.m = m;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color == null ? getColor() : color;
    // this.r = Math.log((Math.E) + m / conf.minMass);
    this.r = Math.cbrt(this.m) / 5;
    this.collision = false;

    this.fX = 0;
    this.fY = 0;

  }

  update(aX, aY, h) {
    this.vx = this.vx + aX * h;
    this.vy = this.vy + aY * h;
    this.x += this.vx * h;
    this.y += this.vy * h;
  }

  clone() {
    return new Body(this.m, this.x, this.y, this.vx, this.vy, this.color);
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, 0);
    context.fillStyle = this.color;
    context.fill();
  }
}
