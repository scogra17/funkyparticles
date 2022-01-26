// eslint-disable-next-line no-unused-vars
class Canvas {
  constructor(width, height) {
    this._width = width;
    this._height = height;
    this._paused = false;
    this._animationRequestID = undefined;
    this._repaints = 0;
    this._repaintsPerUpdate = 7;
  }

  set height(num) { this._height = num }
  get height() { return this._height }
  set width(num) { this._width = num }
  get width() { return this._width }
  get paused() { return this._paused }

  pause() { this._paused = true }
  play() { this._paused = false }

  // eslint-disable-next-line max-statements
  animate(particles) {
    this.play();
    if (this._repaints % this._repaintsPerUpdate === 0) { // update only once every 10 re-paints
      let ctx = document.querySelector('canvas').getContext('2d');
      ctx.save();
      ctx.clearRect(0, 0, this._width, this._height);

      // draw each particle
      for (let idx = 0; idx < particles.count(); idx += 1) {
        ctx.save();
        let particle = particles.getParticle(idx);
        ctx.translate(particle.x, particle.y);
        ctx.drawImage(particle.img, 5, 5, particle.diameter, particle.diameter);
        ctx.restore();
      }

      particles.particleOriginX = this._width;
      particles.particleOriginY = this._height;
      particles.updateParticleLocations();
      ctx.restore();
    }
    this._repaints += 1;

    this._animationRequestID = window.requestAnimationFrame(
      this.animate.bind(this, particles));
  }

  cancelAnimation() {
    window.cancelAnimationFrame(this._animationRequestID);
    this.pause();
  }
}
