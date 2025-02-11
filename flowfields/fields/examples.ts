import Config from './config';

class Examples {
    Random(): Config {
        const examples = [
            this.Example1,
            this.Example2,
            this.Example3,
            this.Example4,
            this.Example5,
            this.Example6,
            this.Example7,
            this.Example8
        ]
        return examples[Math.floor(Math.random() * examples.length)]();
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
            colorDistribution: "random",
            color: ['#726DA8', '#7D8CC4', '#A0D2DB', '#BEE7E8'],
            backgroundColor: '#594157',
            flowDensity: 0.5,
            flowIntensity: 1,
            flowWidth: 2,
            noiseResolution: 0.005,
            noiseScale: 0.25,
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
            color: '#C3E8BD',
            backgroundColor: '#5B7553',
            flowDensity: 0.5,
            flowIntensity: 1,
            flowWidth: 2,
            noiseResolution: 0.0025,
            noiseScale: 0.4,
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