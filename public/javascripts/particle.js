// eslint-disable-next-line no-unused-vars
class Particle {
  constructor(initialX = 0, initialY = 0) {
    this._x = initialX;
    this._y = initialY;
    this.img = new Image();
    this.img.src = window.createCircleSVGSrc(window.randomColor());
    this._diameter = 20;
    this._nearestNeighbor = undefined;
  }

  get x() { return this._x }
  set x(val) { this._x += val }
  get y() { return this._y }
  set y(val) { this._y += val }
  get diameter() { return this._diameter }

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
    return Math.sqrt(((this._x - other.x) ** 2) + ((this._y - other.y) ** 2));
  }

  randomStep(stepSize = 5) {
    let xStep = [-stepSize,stepSize][this.getRandomInt(2)];
    let yStep = [-stepSize,stepSize][this.getRandomInt(2)];
    this._x += xStep;
    this._y += yStep;
  }

  directedStep(x, y) {
    this._x += x;
    this._y += y;
  }

  resetCoorindates(width = 150, height = 150) {
    this._x = width;
    this._y = height;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  coordinates() {
    return { x: this._x, y: this._y };
  }
}
