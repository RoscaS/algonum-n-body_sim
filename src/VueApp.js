let app = new Vue({
  el: "#app",

  data: () => ({
    universe: null,
    inputHandler: null,
    renderer: null,

  }),

  methods: {
    keyUp(e) {
      // if (this.inputHandler == null) return;
      this.inputHandler.keyboard.keyPressed(e, this.renderer);
    },
    mouseDown(e) {
      // if (this.inputHandler == null) return;
      this.inputHandler.mouse.mouseDown(e);
    },
    mouseUp(e) {
      // if (this.inputHandler == null) return;
      this.inputHandler.mouse.mouseUp(e, this.zoomLevel);
    },
    mouseMove(e) {
      // if (this.inputHandler == null) return;
      this.inputHandler.mouse.mouseMove(e);
    },
    mouseWheel(e) {
      // if (this.inputHandler == null) return;
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
      return fps;
      // return this.renderer == null ? 0 : ~~this.renderer.fps;
    },
    running() {
      return this.renderer == null ? 0 : this.renderer.running;
    },
    tracking() {
      return this.renderer == null ? 0 : this.renderer.tracking;
    },
  },

  mounted() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let screenCenter = new Position(width / 2, height / 2);

    let universe = new Universe(screenCenter);
    let inputHandler = new InputHandler(universe, screenCenter);
    let renderer = new Renderer(universe, inputHandler, screenCenter);

    this.universe = universe;
    this.inputHandler = inputHandler;
    this.renderer = renderer;

    window.addEventListener("keyup", e => {
      this.keyUp(e);
    });

    setInterval(() => {
      this.renderer.render();
    }, 15);


  }
});
