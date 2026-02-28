import { vec2 } from 'gl-matrix';
import Config from './config';
import { noise } from '@chriscourses/perlin-noise';

function GetCellSize(canvas: HTMLCanvasElement, config: Config) {
    const canvasSize = Math.max(canvas.width, canvas.height);
    return canvasSize / Math.floor(canvasSize * config.noiseResolution);
}

function GetNoise(config: Config, position: vec2, cellSize: number, layer: number): number {
    // Sample noise in continuous field-space to avoid visible block artifacts.
    const fieldX = position[0] / cellSize;
    const fieldY = position[1] / cellSize;
    return noise(fieldX * config.noiseScale, fieldY * config.noiseScale, layer * config.noiseScale)
}

function SetDirection(out: vec2, noise: number) {
    const angle = noise * (2 * Math.PI);
    out[0] = Math.cos(angle);
    out[1] = Math.sin(angle);
}

export { GetCellSize, GetNoise, SetDirection };
