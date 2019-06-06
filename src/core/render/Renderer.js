
class Renderer {
  constructor(screenCenter) {
    this.screenCenter = screenCenter;

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.steps = 0;
    this.fps = 60;

    this.running = true;
    this.zoomLevel = 1;

    this.start = new Date();
    this.end = null;

    this.canvas = this.initializeCanvas();
  }

  /*---------------------------------------------------------*\
 	|*							        Private Methods
 	\*---------------------------------------------------------*/

  initializeCanvas() {
    let context = document.getElementById("canvas").getContext("2d");
    context.canvas.width = this.width;
    context.canvas.height = this.height;
    return context;
  }

  scaledX(x) {
    return x * this.zoomLevel + this.screenCenter.x;
  }

  scaledY(y) {
    return y * this.zoomLevel + this.screenCenter.y;
  }

  scaledRadius(radius) {
    return radius * this.zoomLevel;
  }

  update() {
    this.end = new Date();
    this.fps = 1000 / (this.end - this.start);
    this.start = this.end;
  }

  draw() {
    this.update();
    this.clearCanvas();
  }

  clearCanvas() {
    this.canvas.clearRect(0, 0, this.width, this.height);
  }

  /*---------------------------------------------------------*\
 	|*							        Public Methods
 	\*---------------------------------------------------------*/

  render() {
    setInterval(() => {
      this.draw();
    }, 15);
  }

  /*---------------------------------*\
 	|*						  Shapes
 	\*---------------------------------*/

  // drawLine(a, b, color) {
  //   this.canvas.beginPath();
  //   this.canvas.moveTo(a.x, a.y);
  //   this.canvas.lineTo(b.x, b.y);
  //   this.canvas.strokeStyle = "white";
  //   this.canvas.stroke();
  // }

  drawVector(a, b) {
    this.canvas.fillStyle = config.vector.color;
    this.canvas.strokeStyle = config.vector.fill;
    this.canvas.beginPath();
    this.canvas.arrow(a.x, a.y, b.x, b.y, config.vector.size);
    this.canvas.fill();
    this.canvas.stroke();
  }



}
