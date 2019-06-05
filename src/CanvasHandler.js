class CanvasHandler {
  constructor() {
    this.context = document.getElementById("canvas").getContext("2d");
    this.context.canvas.width = window.innerWidth;
    this.context.canvas.height = window.innerHeight;
    this.start = new Date();
    this.end = null;
    // this.fps = 0;
  }

  render() {
    this.end = new Date();
    fps = 1000 / (this.end - this.start);
    this.start = this.end;

    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    Body.paintBodies(particles, this.context);
    if (mouse.dragging && !mouse.panning) {
      this.context.beginPath();
      this.context.moveTo(mouse.startX, mouse.startY);
      this.context.lineTo(mouse.currentX, mouse.currentY);
      this.context.strokeStyle = "white";
      this.context.stroke();
    }
    if (running) {
      Body.computeAttraction(particles);
      steps++;
    }
    if (tracking) {
      KeyboardHandler.center(particles);
    }
  }
}
