import Config from './config';
import DrawFlow from './flow';
import debounce from 'debounce';

function Draw(canvas: HTMLCanvasElement, config: Config): void {
    (async () => {
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            console.error(`element with id "${canvas.id}" does not contain canvas.`);
            return
        }

        let setup = function() {
            ctx.canvas.width = canvas.offsetWidth;
            ctx.canvas.height = canvas.offsetHeight;
            drawFlows(canvas, config);
        }
        setup();
        
        window.onresize = debounce(setup, 100);
    })();
}

function drawFlows(canvas: HTMLCanvasElement, config: Config) {
    drawBackground(canvas, config);
    const flowCount = Math.floor(config.flowDensity * canvas.width);
    for (let frame = 0; frame < config.layerCount + 1; frame++) {
        for (let i = 0; i < flowCount; i++) {
            DrawFlow(config, canvas, frame);
        }
    }
    console.log("generated flow field!");
}

function drawBackground(canvas: HTMLCanvasElement, config: Config) {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error(`element with id "${canvas.id}" does not contain canvas.`);
        return
    }
    ctx.fillStyle = config.backgroundColor;
    ctx.beginPath();
    ctx.rect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    ctx.fill();
}
export default Draw;