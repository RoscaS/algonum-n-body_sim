let app = new Vue({
  el: "#app",

  data: () => ({
    settings: false,
    info: conf.info,
    pause: conf.running,


    velocityVectors: conf.velocityVectors,
    netForceVectors: conf.netForceVectors,
    track: conf.track,


    timeMultiplicator: conf.timeMultiplicator + 1,
    trailOpacity: 1 - conf.trailOpacity,



    timeMultiplicatorLabel: 1,

    // display
    massMarker: 0
  }),

  watch: {
    pause(value) {
      conf.running = value;
    },

    info(value) {
      conf.info = value;
      let el = document.getElementById("info");
      el.style.display = conf.info ? "block" : "none";
    },

    velocityVectors(value) {
      conf.velocityVectors = value;
    },

    netForceVectors(value) {
      conf.netForceVectors = value;
    },

    track(value) {
      conf.track = value;
    },


    timeMultiplicator(old, value) {
      conf.timeMultiplicator *= value < old ? 2 : 1 / 2;
      this.timeMultiplicatorLabel = conf.timeMultiplicator;
    },

    trailOpacity(value) {
      if (value === "0") conf.trailOpacity = 1;
      else if (value === "1") conf.trailOpacity = 0.05;
      else if (value === "2") conf.trailOpacity = 0.01;
      else if (value === "3") conf.trailOpacity = 0;

      console.log(conf.trailOpacity);
    },


  },

  methods: {
    modalAbout() {
      let el = document.getElementById("modal-about");
      let instance = M.Modal.init(el);
      instance.open();
    },

    modalHowto() {
      let el = document.getElementById("modal-howto");
      let instance = M.Modal.init(el);
      instance.open();
    }
  },

  mounted() {
    let elems = document.querySelectorAll(".sidenav");
    this.sideNav = M.Sidenav.init(elems, { edge: "left" });
    console.log(elems);
  }
});
