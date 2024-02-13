class Cell {
  constructor(p, col, row, width, height) {
    this.p = p;

    this.col = col;
    this.row = row;
    this.width = width;
    this.height = height;

    this.noise = this.determineNoise(col, row, 0);
    this.position = this.determinePosition(col, row);
  }

  update(frameCount, speed) {
    const depth = frameCount * speed;
    this.noise = this.determineNoise(this.col, this.row, depth);
  }

  determinePosition(col, row) {
    return this.p.createVector(col * this.width, row * this.height);
  }

  determineNoise(xCord, yCord, zCord) {
    let inc = 0.1;
    return this.p.noise(xCord * inc, yCord * inc, zCord * inc);
  }

  getDirection() {
    let angle = this.noise * this.p.TWO_PI;
    return p5.Vector.fromAngle(angle).setMag(1);
  }

  getNoise() {
    return this.noise;
  }
}
module.exports = Cell;