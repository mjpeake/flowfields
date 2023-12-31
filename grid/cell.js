export class Cell {
  constructor(p, col, row, width, height) {
    this.p = p;

    this.col = col;
    this.row = row;
    this.width = width;
    this.height = height;

    this.position = this.determinePosition(col, row);
    this.direction = this.determineDirection(col, row);
  }

  drawDirection(color) {
    this.p.stroke(color);
    let centrePos = this.position.copy().add(this.p.createVector(this.width, this.height));
    let dir = this.direction.copy().mult(5);
    let start = centrePos.copy().sub(dir);
    let end = centrePos.copy().add(dir);
    this.p.line(start.x, start.y, end.x, end.y);
  }

  determinePosition(col, row) {
    return this.p.createVector(col * this.width, row * this.height);
  }

  determineDirection(col, row) {
    let inc = 0.1;
    let angle = this.p.noise(col * inc, row * inc) * this.p.TWO_PI;
    return p5.Vector.fromAngle(angle).setMag(1)
  }
}