const Cell = require("./cell.js")

class Grid {
    constructor(p, width, height, density) {
        if (density == undefined) {
            density = 0.01;
        }
        this.p = p;
        this.cellSize = p.sqrt((width * height) / (density * width * height));
        this.cellCountX = p.round(width / this.cellSize);
        this.cellCountY = p.round(height / this.cellSize);
        this.cellHeight = height / this.cellCountY;
        this.cellWidth = width / this.cellCountX;

        this.cells = this.populateCells();

        this.frameCount = 0;
    }

    animate(speed) {
        this.frameCount++;
        this.updateCells(this.frameCount, speed);
    }

    populateCells() {
        let cells = [[]];
        for (let i = 0; i < this.cellCountX; i++) {
            cells[i] = [];
            for (let j = 0; j < this.cellCountY; j++) {
                cells[i][j] = new Cell(this.p, i, j, this.cellWidth, this.cellHeight);
            }
        }
        return cells
    }

    updateCells(frameCount, speed) {
        for (let i = 0; i < this.cellCountX; i++) {
            for (let j = 0; j < this.cellCountY; j++) {
                this.cells[i][j].update(frameCount, speed);
            }
        }
    }

    getCellAtPos(position) {
        const x = Math.floor(position.x / (this.p.width / this.cellCountX));
        const y = Math.floor(position.y / (this.p.height / this.cellCountY));
        return (x >= 0 && x < this.cellCountX && y >= 0 && y < this.cellCountY) ? this.cells[x][y] : null;
    }

    getCellsAsArr() {
        let cellArr = [];
        for (let i = 0; i < this.cellCountX; i++) {
            for (let j = 0; j < this.cellCountY; j++) {
                cellArr.push(this.cells[i][j]);
            }
        }
        return cellArr;
    }

    draw(color) {
        this.p.strokeWeight(1);
        for (const cellLayer of this.cells) {
            for (const cell of cellLayer) {
                cell.drawDirection(color);
            }
        }
    }
}
module.exports = Grid;