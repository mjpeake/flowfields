export class Particle {
    constructor(p) {
      this.p = p;
      this.position = p.createVector(p.random(p.width), p.random(p.height));
    }
    
    contain() {
      this.position.x = (this.position.x + this.p.width) % this.p.width;
      this.position.y = (this.position.y + this.p.height) % this.p.height;
    }
  
    update() {
      this.contain();
      this.cell = this.p.field.getCellAtPos(this.position);
      this.prevposition = this.position.copy();
      this.position.add(this.cell.direction);
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
  }