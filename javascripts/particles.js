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
      particle.randomStep();
    })
  }
}