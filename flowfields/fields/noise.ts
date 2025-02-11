import { vec2 } from 'gl-matrix';
import Config from './config';
import { noise } from '@chriscourses/perlin-noise';

function GetCellSize(canvas: HTMLCanvasElement, config: Config) {
    const canvasSize = Math.max(canvas.width, canvas.height);
    return canvasSize / Math.floor(canvasSize * config.noiseResolution);
}

function GetCellPos(position: vec2, cellSize: number): number[] {
    return [
        Math.floor(position[0] / cellSize),
        Math.floor(position[1] / cellSize),
    ]
}

function GetNoise(config: Config, cell: number[], layer: number): number {
    return noise(cell[0] * config.noiseScale, cell[1] * config.noiseScale, layer * config.noiseScale)
}

function SetDirection(out: vec2, noise: number) {
    const angle = noise * (2 * Math.PI);
    out[0] = Math.cos(angle);
    out[1] = Math.sin(angle);
}

export { GetCellSize, GetNoise, SetDirection, GetCellPos };