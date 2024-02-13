class LineParticle {
    constructor(p, cell) {
        this.p = p;
        this.cell = cell;
    }

    draw() {
        this.drawLine(this.p.particleColor);
    }

    drawLine(color) {
        this.p.stroke(color);
        let centrePos = this.cell.position.copy().add(this.p.createVector(this.cell.width/2, this.cell.height/2));
        let lineSize = Math.min(this.cell.width/2, this.cell.height/2) * 0.8;
        let dir = this.cell.getDirection().mult(lineSize);
        let start = centrePos.copy().sub(dir);
        let end = centrePos.copy().add(dir);
        this.p.line(start.x, start.y, end.x, end.y);
    }
}
module.exports = LineParticle;