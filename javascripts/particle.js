class Particle {
  constructor() {
    this.img = new Image();
    this.img.src = window.createCircleSVGSrc(window.randomColor());
    this.x = 150;
    this.y = 150;
    this._nearestNeighbor = undefined;
  }

  moveTowardsNearestNeighbor(dampeningFactor = 0.25) {
    if (this._nearestNeighbor &&
        this._nearestNeighbor.x &&
        this._nearestNeighbor.y) {
      let xDistance = this._nearestNeighbor.x - this.x;
      let yDistance = this._nearestNeighbor.y - this.y;
      this.directedStep(
        Math.floor(xDistance * dampeningFactor),
        Math.floor(yDistance * dampeningFactor)
      );
    }
    this.randomStep();
  }

  distanceTo(other) {
    return Math.sqrt(((this.x - other.x) ** 2) + ((this.y - other.y) ** 2));
  }

  randomStep(stepSize = 5) {
    let xStep = [-stepSize,stepSize][this.getRandomInt(2)];
    let yStep = [-stepSize,stepSize][this.getRandomInt(2)];
    this.x += xStep;
    this.y += yStep;
  }

  directedStep(x, y) {
    this.x += x;
    this.y += y;
  }

  resetCoorindates() {
    this.x = 150;
    this.y = 150;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  coordinates() {
    return { x: this.x, y: this.y };
  }
}
