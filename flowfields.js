import { Particle } from "./particle/particle.js";
import { Grid } from "./grid/grid.js";

let debug = false;

function flowfield(cfg) {
  const sketch = (p) => {
    p.setup = function () {
      //Params
      p.particleCount = cfg.particleCount;
      p.particleContain = cfg.particleContain;
      p.backgroundRefresh = cfg.backgroundRefresh;
      p.backgroundColor = p.color(cfg.backgroundColor);
      p.particleColor = p.color(cfg.particleColor);

      // Determine size of parent div
      const div = p.canvas.parentElement;
      p.createCanvas(div.offsetWidth, div.offsetHeight);
      p.background(p.backgroundColor);

      // Create field
      p.field = new Grid(p, div.offsetWidth, div.offsetHeight);

      // Create particles
      p.particles = [];
      for (let i = 0; i < p.particleCount; i++) p.particles.push(new Particle(p));
    }

    p.draw = function () {
      if (p.backgroundRefresh) {
        p.background(p.backgroundColor);
      }
      if (debug) {
        p.field.draw('white');
      }

      // Draw particles
      for (const particle of p.particles) {
        if (particle.onCanvas()) {
          particle.update();
          particle.drawLine(p.particleColor);
        } else if (p.particleContain) {
          particle.contain();
        }
      }
    }

    p.windowResized = function () {
      p.setup();
    }
  }
  return sketch;
}

window.onload = function () {
  const cfg = {
    particleCount: 10000,
    particleContain: false,
    particleColor: $('#flowfield').css("color"),
    backgroundColor: $('#flowfield').css("background-color"),
    backgroundRefresh: false,
  }
  new p5(flowfield(cfg), 'flowfield');
}