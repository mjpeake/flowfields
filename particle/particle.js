export class Particle {
  constructor(p) {
    this.p = p;
    this.position = p.createVector(p.random(1, p.width), p.random(1, p.height));
  }

  update() {
    let currentCell = this.p.field.getCellAtPos(this.position);
    if (currentCell != null) {
      this.prevposition = this.position.copy();
      this.position.add(currentCell.direction);
    }
  }

  drawPoint(color) {
    this.p.strokeWeight(6);
    this.p.stroke(color);
    this.p.point(this.position);
  }

  drawLine(color) {
    this.p.strokeWeight(2);
    this.p.stroke(color);
    this.p.line(this.position.x, this.position.y, this.prevposition.x, this.prevposition.y);
  }

  onCanvas() {
    const inX = this.position.x > 0 && this.position.x < this.p.width;
    const inY = this.position.y > 0 && this.position.y < this.p.height;
    return inX && inY
  }

  contain() {
    if (!this.onCanvas()) {
      this.position = this.p.createVector(this.p.random(this.p.width), this.p.random(this.p.height));
    }
  }
}