import { vec2 } from 'gl-matrix';
import Config from './config';
import { GetCellPos, GetCellSize, GetNoise, SetDirection } from './noise';

function DrawFlow(config: Config, canvas: HTMLCanvasElement, frame: number) {
    const canvasSize = Math.max(canvas.width, canvas.height);
    const cellSize = GetCellSize(canvas, config);
    const layer = frame * config.layerStep;
    const flowStep = 1;

    let position = vec2.fromValues(randomBetween(0, canvas.width), randomBetween(0, canvas.height));

    let currentCell = GetCellPos(position, cellSize);
    let prevCell = currentCell.slice();

    let currNoise = GetNoise(config, currentCell, layer);
    let currDirection = vec2.create();
    SetDirection(currDirection, currNoise);

    let length = 0;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error(`element with id "${canvas.id}" does not contain canvas.`);
        return
    }

    ctx.lineWidth = config.flowWidth;
    ctx.strokeStyle = determineColor(config, currNoise, frame);
    ctx.globalAlpha = config.flowIntensity;

    ctx.beginPath();
    ctx.moveTo(position[0], position[1])
    while (length < canvasSize && isOnCanvas(position, canvas)) {
        vec2.scaleAndAdd(position, position, currDirection, flowStep);
        const cell = GetCellPos(position, cellSize);
        if (cell[0] != currentCell[0] || cell[1] != currentCell[1]) {
            ctx.lineTo(position[0], position[1]);
            prevCell = currentCell;
            currentCell = cell;

            currNoise = GetNoise(config, currentCell, layer);
            SetDirection(currDirection, currNoise);
        }
        length += flowStep;
    }
    ctx.lineTo(position[0], position[1]);
    ctx.stroke();
}

function isOnCanvas(position: vec2, canvas: HTMLCanvasElement): boolean {
    const canvasBuffer = 10;
    return position[0] >= 0 - canvasBuffer && position[0] <= canvas.width + canvasBuffer &&
        position[1] >= 0 - canvasBuffer && position[1] <= canvas.height + canvasBuffer;
}

function determineColor(config: Config, noise: number, frame: number): string {
    let color = config.color;
    if (!Array.isArray(color)) {
        return color
    }
    switch (config.colorDistribution) {
        case 'layered':
            return color[Math.floor(frame % color.length)];
        case 'noise':
            const normalizedNoise = (noise + 1) / 2; // Normalize noise to be between 0 and 1
            return color[Math.round(normalizedNoise * (color.length - 1))];
        default:
            // Random
            return color[Math.floor(randomBetween(0, color.length))];
    }
}

function randomBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export default DrawFlow;