import { Particle } from "./particle/particle.js";
import { Grid } from "./grid/grid.js";

let debug = false;

function flowField(particleColour, backgroundColour) {
  const sketch = (p) => {
    p.setup = function () {
      //Params
      p.flowCount = 10000;
      p.clearBackground = false;
      p.backgroundColor = p.color(backgroundColour);
      p.particleColor = p.color(particleColour);

      // Determine size of parent div
      const div = p.canvas.parentElement;
      p.createCanvas(div.offsetWidth, div.offsetHeight);
      p.background(p.backgroundColor);

      // Create field
      p.field = new Grid(p, div.offsetWidth, div.offsetHeight);

      // Create particles
      p.particles = [];
      for (let i = 0; i < p.flowCount; i++) p.particles.push(new Particle(p));
    }

    p.draw = function () {
      if (p.clearBackground) {
        p.background(p.backgroundColor);
      }
      if (debug) {
        p.field.draw('white');
      }

      // Draw particles
      for (const particle of p.particles) {
        particle.update();
        particle.drawLine(p.particleColor);
      }
    }

    p.windowResized = function () {
      p.setup();
    }
  }
  return sketch;
}

window.onload = function () {
  const particleColor = $('#flowfield').css("color");
  const backgroundColor = $('#flowfield').css("background-color");
  new p5(flowField(particleColor, backgroundColor), 'flowfield');
}