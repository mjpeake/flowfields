const TraceParticle = require("./particle/trace.js")
const Grid = require("./grid/grid.js")

function TraceField(color, bgColor) {
  const sketch = (p) => {
    p.setup = function () {
      //Params
      p.particleDensity = 0.005;
      p.particleIntensity = 5;
      p.particleColor = p.color(color);
      p.particleColor.setAlpha(p.particleIntensity);
      p.backgroundColor = p.color(bgColor);

      // Determine size of parent div
      const div = p.canvas.parentElement;
      p.createCanvas(div.offsetWidth, div.offsetHeight);
      p.background(p.backgroundColor);

      // Create field
      p.field = new Grid(p, div.offsetWidth, div.offsetHeight);

      // Create particles
      p.particleCount = (p.width * p.height) * p.particleDensity;
      p.particles = [];
      for (let i = 0; i < p.particleCount; i++) p.particles.push(new TraceParticle(p));
    }

    p.draw = function () {
      // Draw particles
      for (const particle of p.particles) {
        particle.draw(p.particleColor);
      }
    }

    p.windowResized = function () {
      p.setup();
    }
  }
  return sketch;
}
module.exports = TraceField;