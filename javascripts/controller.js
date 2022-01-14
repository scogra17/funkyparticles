const PARTICLE_COUNT = 10;

class Controller {
  constructor(view, canvas, particles) {
    this.view = view;
    this.canvas = canvas;
    this.particles =  particles;

    this.createInitialParticles();
    this.canvas.animate(this.particles);
    this.bindEvents();
  }

  createInitialParticles() {
    this.particles.addParticles(PARTICLE_COUNT);
  }

  bindEvents() {
    this.view.bindSelectParticleMotion(this.handleSelectParticleMotion);
    this.view.bindRestartCanvas(this.handleRestartCanvas);
  }

  handleSelectParticleMotion = (motion) => {
    this.particles.movement = motion;
    this.canvas.cancelAnimation();
    this.particles.resetCoordinates();
    this.canvas.animate(this.particles);
  }

  handleRestartCanvas = () => {
    this.canvas.cancelAnimation();
    this.particles.resetCoordinates();
    this.canvas.animate(this.particles);
    console.log('in handleRestartCanvas');
  }
}
