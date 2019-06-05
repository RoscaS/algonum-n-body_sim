let app = new Vue({
  el: "#app",

  data: () => ({
    mouse: mouse,
    keyboard: null,
    canvas: null,

    // display
    massMarker: 0,
  }),

  methods: {
    mouseDown(e) {
      this.mouse.mouseDown(e);
    },
    mouseUp(e) {
      this.mouse.mouseUp(e, this.canvas.context);
    },
    mouseMove(e) {
      this.mouse.mouseMove(e);
    },
    mouseWheel(e) {
      this.massMarker = this.mouse.mouseWheel(e);
    }
  },

  mounted() {
    this.canvas = new CanvasHandler();
    this.keyboard = new KeyboardHandler(this.canvas.context);

    setInterval(() => {
      this.canvas.render();
    }, 15);
  }
});
