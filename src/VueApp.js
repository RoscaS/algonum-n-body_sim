let app = new Vue({
  el: "#app",

  data: () => ({
    universe: null,
    inputHandler: null,
    renderer: null,

  }),

  methods: {
    keyUp(e) {
      this.inputHandler.keyboard.keyPressed(e, this.renderer);
    },
    mouseDown(e) {
      this.inputHandler.mouse.mouseDown(e);
    },
    mouseUp(e) {
      this.inputHandler.mouse.mouseUp(e, this.zoomLevel);
    },
    mouseMove(e) {
      this.inputHandler.mouse.mouseMove(e);
    },
    mouseWheel(e) {
      this.inputHandler.mouse.mouseWheel(e, this.renderer);
    }
  },

  computed: {
    bodiesCount() {
      return this.universe == null ? 0 : this.universe.bodies.length;
    },
    initialMass() {
      return this.universe == null ? 0 : this.universe.initialMass;
    },
    gravityConstant() {
      return this.universe == null ? 0 : this.universe.G;
    },
    zoomLevel() {
      return this.renderer == null ? 0 : this.renderer.zoomLevel;
    },
    fps() {
      return this.renderer == null ? 0 : ~~this.renderer.fps;
    },
    running() {
      return this.renderer == null ? 0 : this.renderer.running;
    },
    tracking() {
      return this.renderer == null ? 0 : this.renderer.tracking;
    },
  },

  mounted() {
    window.addEventListener("keyup", e => {
      this.keyUp(e);
    });

    let width = window.innerWidth;
    let height = window.innerHeight;
    let screenCenter = new Position(width / 2, height / 2);

    this.universe = new Universe(screenCenter);
    this.inputHandler = new InputHandler(this.universe, screenCenter);
    this.renderer = new UniverseRenderer(
      this.universe,
      this.inputHandler,
      screenCenter
    );

    this.renderer.render();
  }
});
