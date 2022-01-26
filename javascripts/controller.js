/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
class Controller {
  constructor(view) {
    this.view = view;
    this.canvas = new Canvas(
      window.innerWidth,
      window.innerHeight,
    );
    this.particles =  new Particles(
      this.canvas.width / 2,
      this.canvas.height / 2,
    );
    this.canvas.animate(this.particles);
    this.bindEvents();
  }

  bindEvents() {
    this.view.bindSelectParticleMotion(this.handleSelectParticleMotion);
    this.view.bindPauseCanvas(this.handlePauseCanvas);
    this.view.bindAddParticle(this.handleAddParticle);
    this.view.bindRestartCanvas(this.handleRestartCanvas);
    this.view.bindResizeWindow(this.debounce(this.handleResizeWindow));
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

  handleResizeWindow = (width, height) => {
    this.canvas.width = width;
    this.canvas.height = height;
    this.view.resizeCanvas(width, height);
  }

  debounce(func, timeout = 1000) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args) }, timeout);
    };
  }
}
