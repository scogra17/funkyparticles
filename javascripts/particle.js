class Particle {
  constructor() {
    this.img = new Image();
    this.img.src = window.createCircleSVGSrc(window.randomColor());
    this.x = 150;
    this.y = 150;
  }

  randomStep(stepSize=1) {
    this.x += [-stepSize,stepSize][Math.floor(Math.random()*2)];
    this.y += [-stepSize,stepSize][Math.floor(Math.random()*2)];
  }

  resetCoorindates() {
    this.x = 150;
    this.y = 150;
  }
}
