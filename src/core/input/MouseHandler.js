class MouseHandler {
  constructor(universe, screenCenter) {
    this.screenCenter = screenCenter;
    this.universe = universe;

    this.initialOffset = new Position(0, 0);
    this.position =  null;
    this.dragStart = null;
    this.panning = false;
  }

  /*---------------------------------------------------------*\
 	|*							        Public Methods
 	\*---------------------------------------------------------*/

  mouseDown(e) {
    this.dragStart = new Position(e.clientX, e.clientY);
    if (e.shiftKey) {
      e.preventDefault();
      this.panning = true;
      this.initialOffset.set(this.screenCenter.x, this.screenCenter.y);
    }
  }

  mouseUp(e, zoomLevel) {
    if (!this.isPanning) {
      let vx = (e.clientX - this.dragStart.x) / 10;
      let vy = (e.clientY - this.dragStart.y) / 10;
      let x = (this.dragStart.x - this.screenCenter.x) / zoomLevel;
      let y = (this.dragStart.y - this.screenCenter.y) / zoomLevel;
      this.universe.addBody(x, y, vx, vy, this.universe.initialMass);
    }
    this.panning = false;
    this.dragStart = null;
  }

  mouseMove(e) {
    this.position = new Position(e.clientX, e.clientY);
    if (this.isPanning) {
      let x = this.initialOffset.x + this.position.x - this.dragStart.x;
      let y = this.initialOffset.y + this.position.y - this.dragStart.y;
      this.screenCenter.set(x, y);
    }
  }

  mouseWheel(e, renderer) {
    e.shiftKey ? this.zoom(e, renderer) : this.initialMass(e);
  }

  /*---------------------------------*\
 	|*						  Getters
 	\*---------------------------------*/

  get isDragging() {
    return this.dragStart != null;
  }

  get isPanning() {
    return this.panning;
  }

  /*---------------------------------------------------------*\
 	|*							        Private Methods
 	\*---------------------------------------------------------*/

  zoom(e, renderer) {
    let zoomFactor = config.camera.zoomFactor;
    renderer.zoomLevel *= e.deltaY < 0 ? zoomFactor : 1 / zoomFactor;
  }

  initialMass(e) {
    let massFactor = config.physics.massFactor;
    let mass = this.universe.initialMass;
    mass *= e.deltaY < 0 ? massFactor : 1 / massFactor;
    if (mass > config.physics.maxMass) mass = config.physics.maxMass;
    if (mass < config.physics.minMass) mass = config.physics.minMass;
    this.universe.initialMass = mass;
  }
}
