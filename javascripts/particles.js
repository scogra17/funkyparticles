/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
class Particles {
  constructor(initialX = 0, initialY = 0) {
    this._particleOriginX = initialX;
    this._particleOriginY = initialY;
    this._particles = [];
    this._movement = 'random';
    this._movementInfo = {
      swarm: 'https://en.wikipedia.org/wiki/Swarm_behaviour',
      random: 'https://en.wikipedia.org/wiki/Random_walk',
    };
    this.addParticle();
  }

  set particleOriginX(val) { this._particleOriginX = val / 2 }
  get particleOriginX() { return this._particleOriginX }
  set particleOriginY(val) { this._particleOriginY = val / 2 }
  get particleOriginY() { return this._particleOriginY }
  set movement(name) { this._movement = name}
  get movement() { return this._movement }
  get particles() { return this._particles }

  getParticle(idx) { return this._particles[idx] }

  count() {
    return this._particles.length;
  }

  assignNeighbors() {
    let particle;
    for (let idx1 = 0; idx1 < this._particles.length; idx1 += 1) {
      particle = this._particles[idx1];
      let minDistance;
      for (let idx2 = 0; idx2 < this._particles.length; idx2 += 1) {
        if (idx1 === idx2 ) { continue }
        let otherParticle = this._particles[idx2];
        let distance = particle.distanceTo(otherParticle);
        if (!minDistance) {
          minDistance = distance;
          particle.nearestNeighbor = otherParticle.coordinates();
        } else if (distance < minDistance) {
          minDistance = distance;
          particle.nearestNeighbor = otherParticle.coordinates();
        }
      }
    }
  }

  addParticle(width = this._particleOriginX, height = this._particleOriginY) {
    this._particles.push(new Particle(width, height));
  }

  addParticles(count) {
    for (let particle = 0; particle < count; particle += 1) {
      this.addParticle();
    }
  }

  resetCoordinates() {
    this.particles.forEach((particle) => {
      particle.resetCoorindates(this._particleOriginX, this._particleOriginY);
    });
  }

  updateParticleLocations() {
    switch (this._movement) {
      case 'random':
        this.randomWalkStep();
        break;
      case 'swarm':
        this.swarmStep();
        break;
      default:
        this.randomWalkStep();
    }
  }

  randomWalkStep() {
    this._particles.forEach((particle) => {
      particle.randomStep();
    });
  }

  swarmStep() {
    this._particles.forEach(() => {
      this.assignNeighbors();
      this._particles.forEach((particle) => {
        particle.moveTowardsNearestNeighbor();
      });
    });
  }
}