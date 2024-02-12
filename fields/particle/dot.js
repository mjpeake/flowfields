export class DotParticle {
    constructor(p, cell) {
        this.p = p;
        this.cell = cell;
        this.maxSize = Math.min(this.cell.width, this.cell.height);
    }

    draw(color) {
        this.p.fill(color);
        let centrePos = this.cell.position.copy().add(this.p.createVector(this.cell.width/2, this.cell.height/2));
        this.p.ellipse(centrePos.x, centrePos.y, this.cell.getNoise() * this.maxSize);
    }
}