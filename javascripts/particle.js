class Particle {
  constructor() {
    this.img = new Image();
    this.img.src = window.createCircleSVGSrc(window.randomColor());
    this.x = 150;
    this.y = 150;
    this._nearestNeighbor;
  }

  moveTowardsNearestNeighbor(p = 0.25) {
    let xDistance = this.nearestNeighbor.x - this.x;
    let yDistance = this.nearestNeighbor.y - this.y;
    this.directedStep(Math.floor(xDistance*p), Math.floor(yDistance*p));
    this.randomStep();
  }

  distanceTo(other) {
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
  }

  randomStep(stepSize=1) {
    this.x += [-stepSize,stepSize][Math.floor(Math.random()*2)];
    this.y += [-stepSize,stepSize][Math.floor(Math.random()*2)];
  }

  directedStep(x, y) {
    this.x += x;
    this.y += y;
  }

  resetCoorindates() {
    this.x = 150;
    this.y = 150;
  }
}
