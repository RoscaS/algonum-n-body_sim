let app = new Vue({
  el: "#app",

  data: () => ({
    timeMultiplicator: conf.timeMultiplicator,

    // display
    massMarker: 0
  }),

  methods: {
    mouseDown(e) {},
    mouseUp(e) {},
    mouseMove(e) {},
    mouseWheel(e) {}
  },

  mounted() {
    let elems = document.querySelectorAll(".sidenav");
    this.sideNav = M.Sidenav.init(elems, { edge: "left" });
    console.log(elems)
  }
});
