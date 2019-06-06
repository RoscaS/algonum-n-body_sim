let fps;

class Renderer {
  constructor(universe, inputHandler, screenCenter) {
    this.screenCenter = screenCenter;

    this.tracking = false;
    this.universe = universe;
    this.inputHandler = inputHandler;

    this.steps = 0;
    // this.fps = 60;

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
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    return context;
  }

  drawUniverse() {
    this.universe.bodies.forEach(body => {
      this.drawBody(body);
    });
  }

  drawBody(body) {
    this.canvas.beginPath();
    let x = body.position.x * this.zoomLevel + this.screenCenter.x;
    let y = body.position.y * this.zoomLevel + this.screenCenter.y;
    let r = body.radius * this.zoomLevel;
    this.canvas.arc(x, y, r, 0, 2 * Math.PI, false);
    this.canvas.fillStyle = body.color.toString();
    this.canvas.fill();
  }

  /*---------------------------------------------------------*\
 	|*							        Public Methods
 	\*---------------------------------------------------------*/

  render() {
    if (!this.running) return;
    this.end = new Date();
    fps = 1000 / (this.end - this.start);
    this.start = this.end;

    this.canvas.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.drawUniverse();

    if (this.inputHandler.mouse.isDragging && !this.inputHandler.mouse.isPanning) {
      this.drawVector(this.inputHandler.mouse.dragStart, this.inputHandler.mouse.position)
    }

    if (this.running) {
      this.universe.computeAttraction();
      this.steps++;
    }

    if (this.tracking) {
      this.trackHeaviestBody();
    }
  }

  /*---------------------------------*\
 	|*						  Shapes
 	\*---------------------------------*/

  drawVector(a, b) {
    this.canvas.fillStyle = config.vector.color;
    this.canvas.strokeStyle = config.vector.fill;
    this.canvas.beginPath();
    this.canvas.arrow(a.x, a.y, b.x, b.y, config.vector.size);
    this.canvas.fill();
    this.canvas.stroke();
  }

  /*---------------------------------*\
 	|*						  Actions
 	\*---------------------------------*/

  trackHeaviestBody() {
    let body = null;
    let mass = 0;
    this.universe.bodies.forEach(b => {
      if (b.mass > mass) {
        body = b;
        mass = b.mass;
      }
    });
    let x = body.position.x * this.zoomLevel;
    let y = body.position.y * this.zoomLevel;
    this.screenCenter.x = window.innerWidth / 2 - x;
    this.screenCenter.y = window.innerHeight / 2 - y;
  }
}
