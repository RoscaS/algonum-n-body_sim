class InputHandler {

  constructor(universe, screenCenter) {

    this.mouse = new MouseHandler(universe,  screenCenter);
    this.keyboard = new KeyboardHandler(universe, this.mouse);
  }
}
