import { Cell } from "./cell.js"

export class Grid {
    constructor(p, width, height) {
        this.p = p;

        this.cellSize = 10;
        this.cellCountX = p.round(width / this.cellSize);
        this.cellCountY = p.round(height / this.cellSize);
        this.cellHeight = height / this.cellCountY;
        this.cellWidth = width / this.cellCountX;

        this.cells = this.populateCells();
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

    getCellAtPos(position) {
        const x = Math.floor(position.x / (this.p.width / this.cellCountX));
        const y = Math.floor(position.y / (this.p.height / this.cellCountY));
        return (x >= 0 && x < this.cellCountX && y >= 0 && y < this.cellCountY) ? this.cells[x][y] : null;
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