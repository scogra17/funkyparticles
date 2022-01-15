class Particles {
  constructor() {
    this._particles = [];
    this._movement = 'random';
  }

  set movement(name) {
    this._movement = name;
  }

  get particles() {
    return this._particles;
  }

  assignNeighbors() {
    let particle;
    for (let i = 0; i < this._particles.length ; i += 1) {
      particle = this._particles[i];
      let minDistance;
      for (let j = 0; j < this._particles.length; j += 1) {
        if (i === j ) { continue };
        let otherParticle = this._particles[j];
        let distance = particle.distanceTo(otherParticle);
        if (!minDistance) {
          minDistance = distance;
          particle.nearestNeighbor = otherParticle;
        } else {
          if (distance < minDistance) {
            minDistance = distance;
            particle.nearestNeighbor = otherParticle;
          }
        }
      }
    }
  }

  addParticle() {
    this._particles.push(new Particle());
  }

  addParticles(n) {
    for (let i = 0; i < n; i += 1) {
      this.addParticle();
    }
  }

  resetCoordinates() {
    this.particles.forEach((particle) => {
      particle.resetCoorindates();
    })
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
    })
  }

  swarmStep() {
    this._particles.forEach((particle) => {
      // TODO: implement swarm behavior
      this.assignNeighbors();
      this._particles.forEach((particle) => {
        particle.moveTowardsNearestNeighbor();
      })
    })
  }
}