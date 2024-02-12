import { LineParticle } from "./particle/line.js";
import { Grid } from "./grid/grid.js";

export function LineField(color, bgColor) {
    const sketch = (p) => {
        p.setup = function () {
            //Params
            p.particleColor = p.color(color);
            p.backgroundColor = p.color(bgColor);

            // Determine size of parent div
            const div = p.canvas.parentElement;
            p.createCanvas(div.offsetWidth, div.offsetHeight);
            p.background(p.backgroundColor);

            // Create field
            p.field = new Grid(p, div.offsetWidth, div.offsetHeight, 0.001);

            // Create particles
            let cells = p.field.getCellsAsArr();
            p.particles = [];
            for (const cell of cells) {
                p.particles.push(new LineParticle(p, cell));
            }
        }


        p.draw = function () {
            p.background(p.backgroundColor);
            p.field.animate(0.25);

            // Draw particles
            for (const particle of p.particles) {
                particle.draw();
            }
        }

        p.windowResized = function () {
            p.setup();
        }
    }
    return sketch;
}
