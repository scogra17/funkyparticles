class Particles {
  constructor() {
    this._particles = [];
    this._movement = 'random';
    this._movementInfo = {
      swarm: 'https://en.wikipedia.org/wiki/Swarm_behaviour',
      random: 'https://en.wikipedia.org/wiki/Random_walk',
    };
  }

  set movement(name) {
    this._movement = name;
  }

  get particles() {
    return this._particles;
  }

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
    this._particles.forEach((particle) => {
      this.assignNeighbors();
      this._particles.forEach((particle) => {
        particle.moveTowardsNearestNeighbor();
      });
    });
  }
}