import Config from './config';

class Examples {
    Random(): Config {
        const examples = [
            { name: "Example1", create: this.Example1.bind(this) },
            { name: "Example2", create: this.Example2.bind(this) },
            { name: "Example3", create: this.Example3.bind(this) },
            { name: "Example4", create: this.Example4.bind(this) },
            { name: "Example5", create: this.Example5.bind(this) },
            { name: "Example6", create: this.Example6.bind(this) },
            { name: "Example7", create: this.Example7.bind(this) },
            { name: "Example8", create: this.Example8.bind(this) },
        ];

        const selected = examples[Math.floor(Math.random() * examples.length)];
        console.log(`[FlowFields] Using ${selected.name}`);
        return selected.create();
    }

    Example1(): Config {
        return new Config({
            color: ['#576CA8', '#274690', '#1B264F'],
            backgroundColor: '#F6F4F6',
            flowDensity: 1,
            flowIntensity: 0.25,
            noiseScale: 0.1,
            noiseResolution: 0.1, 
            layerCount: 3,
            layerStep: 0.1,
        });
    }

    Example2(): Config {
        return new Config({
            colorDistribution: "noise",
            color: ['#F8FAFC', '#22D3EE', '#0EA5E9', '#2563EB'],
            backgroundColor: '#020617',
            flowDensity: 0.95,
            flowIntensity: 0.2,
            flowWidth: 0.95,
            noiseResolution: 0.09,
            noiseScale: 0.008,
            layerCount: 2,
            layerStep: 0.26,
        });
    }

    Example3(): Config {
        return new Config({
            color: 'red',
            backgroundColor: 'black',
            flowWidth: 1,
            flowDensity: 2,
            flowIntensity: 0.1,
            noiseResolution: 1,
            noiseScale: 0.0015,
        });
    }

    Example4(): Config {
        return new Config({
            color: ['#2D4739', '#09814A', '#BCB382', '#E5C687'],
            backgroundColor: '#121619',
            flowWidth: 1,
            flowDensity: 2,
            flowIntensity: 0.1,
            noiseResolution: 1,
            noiseScale: 0.015,
        });
    }

    Example5(): Config {
        return new Config({
            colorDistribution: "random",
            color: ['#BF211E', '#E9CE2C', '#F9DC5C', '#E5F993', '#69A197'],
            backgroundColor: '#121619',
            flowWidth: 10,
            flowDensity: 0.2,
            flowIntensity: 1,
            noiseResolution: 0.1,
            noiseScale: 0.001,
        });
    }

    Example6(): Config {
        return new Config({
            color: ['#C9F2C7', '#ACECA1', '#96BE8C', '#629460'],
            backgroundColor: '#243119',
            flowWidth: 5,
            flowDensity: 0.1,
            flowIntensity: 1,
            noiseResolution: 0.1,
            noiseScale: 0.015,
        });
    }

    Example7(): Config {
        return new Config({
            colorDistribution: "noise",
            color: ['#F5F5F5', '#CFCFCF', '#8E8E8E', '#2E2E2E'],
            backgroundColor: '#0A0A0A',
            flowDensity: 0.95,
            flowIntensity: 0.2,
            flowWidth: 1,
            noiseResolution: 0.075,
            noiseScale: 0.009,
            layerCount: 3,
            layerStep: 0.14,
        });
    }

    Example8(): Config {
        return new Config({
            colorDistribution: "random",
            color: ['#3b6064', '#55828b', '#87bba2', '#c9e4ca'],
            backgroundColor: '#364958',
            flowWidth: 20,
            flowDensity: 0.05,
            flowIntensity: 1,
            noiseResolution: 1,
            noiseScale: 0.001,
        });
    }
}

export default Examples;
