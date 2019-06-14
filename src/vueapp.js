let app = new Vue({
  el: "#app",

  data: () => ({
    settings: false,
    timeMultiplicator: conf.timeMultiplicator +1,





    timeMultiplicatorLabel: 1,

    // display
    massMarker: 0
  }),


  watch: {
    timeMultiplicator(old, value) {
      conf.timeMultiplicator *= value < old ? 2 : 1 / 2;
      this.timeMultiplicatorLabel = conf.timeMultiplicator;
    },
  },

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
