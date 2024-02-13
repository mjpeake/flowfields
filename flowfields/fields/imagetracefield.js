const TraceParticle = require("./particle/trace.js")
const Grid = require("./grid/grid.js")

function ImageTraceField(imgPath, bgColor) {
  const sketch = (p) => {
    p.setup = function () {
      //Params
      p.particleDensity = 0.005;
      p.img = p.loadImage(imgPath);
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
        let getX = p.norm(particle.position.x, 0, p.width) * p.img.width;
        let getY = p.norm(particle.position.y, 0, p.height) * p.img.height;
        let pix = p.img.get(getX, getY);
        let pixColor = p.color(p.red(pix), p.green(pix), p.blue(pix), 20);
        particle.draw(pixColor);
      }
    }

    p.windowResized = function () {
      p.setup();
    }
  }
  return sketch;
}
module.exports = ImageTraceField;