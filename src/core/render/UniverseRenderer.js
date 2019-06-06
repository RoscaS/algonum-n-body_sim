class UniverseRenderer extends Renderer {
  constructor(universe, inputHandler, screenCenter) {
    super(screenCenter);
    this.tracking = false;
    this.universe = universe;
    this.inputHandler = inputHandler;
  }

  /*---------------------------------------------------------*\
 	|*							        Private Methods
 	\*---------------------------------------------------------*/

  get shouldDrawVector() {
    let dragging = this.mouse.isDragging;
    let panning = this.mouse.isPanning;
    return dragging && !panning;
  }

  drawUniverse() {
    this.universe.bodies.forEach(body => {
      // console.log(body.toString());
      this.drawBody(body);
    });
  }

  drawBody(body) {
    this.canvas.beginPath();
    let x = this.scaledX(body.position.x);
    let y = this.scaledY(body.position.y);
    let r = this.scaledRadius(body.radius);
    this.canvas.arc(x, y, r, 0, 2 * Math.PI, false);
    this.canvas.fillStyle = body.color.toString();
    this.canvas.fill();
  }

  draw() {
    if (!this.running) return;
    super.draw();

    this.drawUniverse(this.fps);

    if (this.shouldDrawVector) {
      this.drawVector(this.mouse.dragStart, this.mouse.position);
    }

    this.universe.computeAttraction(this.fps);
    this.steps++;

    if (this.tracking) {
      this.trackHeaviestBody();
    }
  }

  /*---------------------------------------------------------*\
 	|*							        Public Methods
 	\*---------------------------------------------------------*/

  /*---------------------------------*\
 	|*						  Getters
 	\*---------------------------------*/

  get mouse() {
    return this.inputHandler.mouse;
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
