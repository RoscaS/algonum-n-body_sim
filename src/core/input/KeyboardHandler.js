class KeyboardHandler {
  event = null;

  constructor(universe, mouse) {
    this.universe = universe;
    this.mouse = mouse;
    // add up and down arrow to inc/dec mass
  }

  keyPressed(e, renderer) {
    // console.log(e);
    switch (e.key) {
      case "h":
        // help
        break;
      case "k":
        // this.randDist();
        break;
      case " ":
        this.universe.cloud(this.mouse.position);
        break;
      case "c":
        renderer.tracking = !renderer.tracking;
        break;
      case "d":
        // clean(particles); // delete bodies out of sight
        break;
      case "+":
        if (e.shiftKey) this.universe.G *= config.physics.gFactor;
        break;
      case "-":
        if (e.shiftKey) this.universe.G /= config.physics.gFactor;
        break;
      case "p":
        renderer.running = !renderer.running;
        break;
    }
  }
}
