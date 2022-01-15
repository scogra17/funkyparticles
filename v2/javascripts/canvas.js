class Canvas {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.animationRequestID;
  }

  animate(particles) {
    var ctx = document.querySelector('canvas').getContext('2d');
    ctx.save();
    ctx.clearRect(0, 0, this.height, this.width);

    for (let i = 0; i < particles.particles.length; i += 1) {
      ctx.save();
      let particle = particles.particles[i];
      ctx.translate(particle.x, particle.y);
      ctx.drawImage(particle.img, 5, 5, 20, 20);

      ctx.restore();
    }
    particles.updateParticleLocations();

    ctx.restore();

    this.animationRequestID = window.requestAnimationFrame(this.animate.bind(this, particles));
  }

  cancelAnimation() {
    window.cancelAnimationFrame(this.animationRequestID)
  }
}
