const PARTICLE_COUNT = 1;

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
    this.view.bindPauseCanvas(this.handlePauseCanvas);
    this.view.bindAddParticle(this.handleAddParticle);
    this.view.bindRestartCanvas(this.handleRestartCanvas);
  }

  handleSelectParticleMotion = (motion) => {
    this.particles.movement = motion;
    this.canvas.cancelAnimation();
    this.canvas.animate(this.particles);
  }

  handlePauseCanvas = () => {
    if (this.canvas.paused) {
      this.canvas.animate(this.particles);
    } else {
      this.canvas.cancelAnimation();
    }
    this.view.togglePlayPause(this.canvas.paused);
  }

  handleAddParticle = () => {
    this.particles.addParticle();
  }

  handleRestartCanvas = () => {
    this.canvas.cancelAnimation();
    this.particles.resetCoordinates();
    this.canvas.animate(this.particles);
    this.view.togglePlayPause(this.canvas.paused);
  }
}
