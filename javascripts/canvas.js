class Canvas {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.paused = false;
    this.animationRequestID = undefined;
    this.counter = 0;
  }

  animate(particles) {
    if (this.counter % 10 === 0) {
      this.paused = false;
      let ctx = document.querySelector('canvas').getContext('2d');
      ctx.save();
      ctx.clearRect(0, 0, this.height, this.width);

      for (let idx = 0; idx < particles.particles.length; idx += 1) {
        ctx.save();
        let particle = particles.particles[idx];
        ctx.translate(particle.x, particle.y);
        ctx.drawImage(particle.img, 5, 5, 20, 20);

        ctx.restore();
      }
      particles.updateParticleLocations();

      ctx.restore();
    }
    this.counter += 1;

    this.animationRequestID = window.requestAnimationFrame(
      this.animate.bind(this, particles));
  }

  cancelAnimation() {
    window.cancelAnimationFrame(this.animationRequestID);
    this.paused = true;
  }
}
