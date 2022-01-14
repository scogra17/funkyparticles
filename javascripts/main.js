class App {
  constructor() {
    this.view = new View();
    this.canvas = new Canvas(500, 400);
    this.particles = new Particles();
    this.controller = new Controller(this.view, this.canvas, this.particles)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
})
