const ZOOM_FACTOR = 1.2;
const MASS_FACTOR = 2;

class MouseHandler {
  constructor() {
    this.initOffsetX = 0;
    this.initOffsetY = 0;

    this.startX = null;
    this.startY = null;

    this.currentX = 0;
    this.currentY = 0;

    this.dragging = false;
    this.panning = false;
    this.shiftPressed = false;
  }

  mouseDown(e) {
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.dragging = true;
    if (e.which == 2 || this.shiftPressed) {
      e.preventDefault();
      this.panning = true;
      this.initOffsetX = centerX;
      this.initOffsetY = centerY;
    }
  }

  mouseUp(e, context) {
    if (!this.panning) {
      let vx = (e.clientX - this.startX) / 10;
      let vy = (e.clientY - this.startY) / 10;
      particles.push(
        new Body(
          mass,
          new Vector(vx, vy),
          (this.startX - centerX) / zoomScale,
          (this.startY - centerY) / zoomScale
        )
      );
      Body.paintBodies(particles, context);
    }
    this.panning = false;
    this.dragging = false;
  }

  mouseMove(e) {
    this.currentX = e.clientX;
    this.currentY = e.clientY;
    if (this.panning) {
      centerX = this.initOffsetX + (this.currentX - this.startX);
      centerY= this.initOffsetY + (this.currentY - this.startY);
    }
  }

  mouseWheel(e) {
    e.shiftKey ? this._zoom(e) : this._changeInitialMass(e);
    return mass;
  }

  _zoom(e) {
    zoomScale *= e.deltaY < 0 ? ZOOM_FACTOR : 1 / ZOOM_FACTOR;
  }

  _changeInitialMass(e) {
    mass *= e.deltaY < 0 ? MASS_FACTOR : 1 / MASS_FACTOR;
    if (mass > 32768) mass = 32768;
    if (mass < 2) mass = 2;
  }
}

let mouse = new MouseHandler();
