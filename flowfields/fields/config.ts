type ColorDistribution = 'layered' | 'noise' | 'random';

class Config {
    public color: string | string[];
    public backgroundColor: string;
    public colorDistribution: ColorDistribution;
    public flowDensity: number;
    public flowIntensity: number;
    public flowWidth: number;
    public noiseScale: number;
    public noiseResolution: number;
    public layerCount: number;
    public layerStep: number;

    constructor(options: {
        color?: string | string[],
        colorDistribution?: ColorDistribution
        backgroundColor?: string,
        flowDensity?: number,
        flowIntensity?: number,
        flowWidth?: number,
        flowStep?: number,
        noiseScale?: number,
        noiseResolution?: number,
        layerCount?: number,
        layerStep?: number,
    } = {}) {
        if (options.color === undefined) {
            throw new Error('no color set');
        }
        if (options.backgroundColor === undefined) {
            throw new Error('no background color set');
        }
        this.color = options.color;
        this.backgroundColor = options.backgroundColor;
        this.flowDensity = options.flowDensity ?? 0.5;
        this.flowIntensity = options.flowIntensity ?? 0.35;
        this.flowWidth = options.flowWidth ?? 1;
        this.noiseScale = options.noiseScale ?? 0.01;
        this.noiseResolution = options.noiseResolution ?? 0.075;
        this.layerCount = options.layerCount ?? 0;
        this.layerStep = options.layerStep ?? (this.layerCount > 0 ? 1 : 0);
        this.colorDistribution = options.colorDistribution ?? (this.layerCount > 0 ? 'layered' : 'noise');
    }
}

export default Config;